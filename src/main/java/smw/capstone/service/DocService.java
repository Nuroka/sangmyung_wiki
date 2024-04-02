package smw.capstone.service;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import smw.capstone.DTO.*;
import smw.capstone.entity.DocFile;
import smw.capstone.entity.Documents;
import smw.capstone.entity.Files;
import smw.capstone.entity.Member;
import smw.capstone.repository.DocFileRepository;
import smw.capstone.repository.DocRepository;
import smw.capstone.repository.MemberRepository;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class DocService {

    private final DocRepository docRepository;
    private final DocFileRepository docFileRepository;
    private final MemberRepository memberRepository;
    private final FileService fileService;
    private final DocFileService docFileService;

    public List<DocDTO> getDoc(DocsIdDTO docsIdDTO) {
        List<DocDTO> docDto = new ArrayList<>();

        //doc id 리스트를 받아서 id별로 doc 내용과 파일 찾아주기
        for (Long docId : docsIdDTO.getDocsIdList()) {

            DocDTO responseDoc = new DocDTO();
            Optional<Documents> documents = docRepository.findById(docId);
            if (!documents.isPresent()) {
                log.info("존재하지 않는 문서입니다."); //클라이언트 예외 추가
                break;
            }
            Documents findDocuments = documents.get();
            responseDoc.setDocuments(buildResDocDto(findDocuments)); //리스트로 된 id 순차적으로 add

            setFileDto(responseDoc, docId); //docid와 연관된 file리스트

            docDto.add(responseDoc);
        }
        return docDto;
    }

    public DocsIdDTO getDocsByKeyword(String keyword) {
        List<Documents> findDocs = docRepository.findByKeyword(keyword);
        DocsIdDTO docsIdDto = new DocsIdDTO();
        for (Documents document : findDocs) {
            docsIdDto.getDocsIdList().add(document.getId());
        }
        return docsIdDto;
    }

    public List<DocDTO> findAll() {
        List<Documents> documents = docRepository.findAll();
        List<DocDTO> docDTO = new ArrayList<>();
        for (Documents document : documents) {
            DocDTO responseDoc = new DocDTO();

            responseDoc.setDocuments(buildResDocDto(document));

            setFileDto(responseDoc, document.getId());
            docDTO.add(responseDoc);
        }

        return docDTO;
    }

    public void setFileDto(DocDTO docDTO, Long docId) {
        List<DocFile> docFiles = docFileRepository.findByDocumentId(docId);
        for (DocFile docFile : docFiles) { //docsId에 연관된 files
            Files findFile = docFile.getFile();


            FileUploadDTO fileUploadDTO = FileUploadDTO.builder().fileName(findFile.getName())
                    .category(findFile.getCategory())
                    .license(findFile.getLicense())
                    .summary(findFile.getSummary())
                    .build();
            String fileUrl = findFile.getStoredFileName().replace('/', '\\');


            docDTO.addFileDto(FileDTO.builder() //docid 관련 file 리스트 add
                    .responseFilePathDTO(new ResponseFilePathDTO(fileUrl))
                    .fileUploadDTO(fileUploadDTO).build());

        }
    }

    public ResponseDocDTO buildResDocDto(Documents document) {
        return ResponseDocDTO.builder()
                .title(document.getTitle())
                .updateAt(document.getUpdateAt())
                .memberId(document.getMember().getId())
                .createAt(document.getCreateAt())
                .content(document.getContent())
                .id(document.getId()).build();
    }

    public DocsIdDTO getMyDocs(/*인증정보*/) {
        Member temp = memberRepository.findById(1L); //임시 데이터, 실행 오류 방지
            List<Documents> documents = docRepository.findByMember(temp/*인증된 멤버 객체*/);
        DocsIdDTO dosIdDTO = new DocsIdDTO();
        for (Documents document : documents) {
            dosIdDTO.getDocsIdList().add(document.getId());
        }
        return dosIdDTO;
    }

    @Transactional
    public void deleteDoc(Long id /*사용자 인증정보*/) {
            /*사용자 정보 확인 후 삭제 가능한 문서면 삭제*/
        docRepository.deleteById(id);
    }

    @Transactional
    public ReqUpdateDocDTO updateDoc(ReqUpdateDocDTO reqUpdateDocDTO/*사용자 정보*/) {
        //사용자 정보 토대로 reqUpdateDocDoc.fileName 으로 filepath 찾고 반환
        Optional<Documents> findDoc = docRepository.findById(reqUpdateDocDTO.getDocId());
        List<String> fileNames = new ArrayList<>();
        Documents updateDoc = null;
        try {
            updateDoc = findDoc.get();
            docFileService.updateDocFile(reqUpdateDocDTO, reqUpdateDocDTO.getFileName());
            updateDoc.updateDoc(reqUpdateDocDTO.getContent(), LocalDate.now()); //변경이 감지되면 바로 flush하나? test해보기

            List<DocFile> docFileList = docFileRepository.findByDocument(updateDoc);
            for (DocFile docFile : docFileList) {
                fileNames.add(fileService.findFilePathByFile(docFile.getFile())); //여기서 file이 null
            }
        } catch (NullPointerException e) {
            log.info("{} 해당 문서가 존재하지 않습니다.", reqUpdateDocDTO.getDocId(), e);
        }

        return ReqUpdateDocDTO.builder()
                .docId(updateDoc.getId())
                .content(updateDoc.getContent())
                .fileName(fileNames)
                .build();
    }

    public DocDTO showRandDoc() {
        /*사용자가 볼 수 있는 문서인가 확인*/
        List<Documents> documents = docRepository.findAll();

        if (documents.isEmpty()) {
            log.info("문서가 없습니다");
            //나중에 예외 처리
        }
        int rand = (int) (Math.random() * documents.size() + 1);
        Documents randDoc = docRepository.getReferenceById((long) rand);

        ResponseDocDTO responseDocDTO = ResponseDocDTO.builder()
                .id(randDoc.getId())
                .title(randDoc.getTitle())
                .createAt(randDoc.getCreateAt())
                .updateAt(randDoc.getUpdateAt())
                .memberId(randDoc.getMember().getId())
                .content(randDoc.getContent())
                .build();
        List<FileDTO> fileDTOList = fileService.findFilesByDocId((long) rand);

        return  DocDTO.builder()
                .documents(responseDocDTO)
                .fileDtoList(fileDTOList).build();
    }
}
