package smw.capstone.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import smw.capstone.DTO.*;
import smw.capstone.common.exception.BusinessException;
import smw.capstone.common.exception.CustomErrorCode;
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
            Documents documents = docRepository.findById(docId).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_DOC));

            responseDoc.setDocuments(buildResDocDto(documents)); //리스트로 된 id 순차적으로 add

            setFileDto(responseDoc, docId); //docid와 연관된 file리스트

            docDto.add(responseDoc);
        }
        return docDto;
    }

    public DocsIdDTO getDocsByKeyword(String keyword) {
        if (keyword == null) {
            throw new BusinessException(CustomErrorCode.NOT_EXIST_KEYWORD);
        }
        DocsIdDTO docsIdDto = new DocsIdDTO();
        List<Documents> findDocs = docRepository.findByKeyword(keyword);
        for (Documents document : findDocs) {
            docsIdDto.getDocsIdList().add(document.getId());
        }
        if (findDocs.isEmpty()) {
            throw new BusinessException(CustomErrorCode.NOT_EXIST_KEYWORD_DOC);
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
        DocsIdDTO dosIdDTO = new DocsIdDTO();
        try {
            Member temp = memberRepository.findById(1L); //임시 데이터, 실행 오류 방지
            List<Documents> documents = docRepository.findByMember(temp/*인증된 멤버 객체*/);
            for (Documents document : documents) {
                dosIdDTO.getDocsIdList().add(document.getId());
            }
        } catch (NullPointerException e) {
            throw new BusinessException(CustomErrorCode.NOT_EXIST_DOC);
        }

        return dosIdDTO;
    }

    @Transactional
    public void deleteDoc(Long id /*사용자 인증정보*/) {
        if (id == null) {
            throw new BusinessException(CustomErrorCode.NOT_EXIST_DOC_ID);

        }
        try {
            /*사용자 정보 확인 후 삭제 가능한 문서면 삭제*/
            docRepository.deleteById(id);
        } catch (NullPointerException e) {
            throw new BusinessException(CustomErrorCode.NOT_EXIST_DOC_ID);
        }

    }

    @Transactional
    public ReqUpdateDocDTO updateDoc(ReqUpdateDocDTO reqUpdateDocDTO/*사용자 정보*/) {
        //사용자 정보 토대로 reqUpdateDocDoc.fileName 으로 filepath 찾고 반환
        Documents findDoc = docRepository.findById(reqUpdateDocDTO.getDocId()).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_DOC));
        List<String> fileNames = new ArrayList<>();

        docFileService.updateDocFile(reqUpdateDocDTO, reqUpdateDocDTO.getFileName());
        findDoc.updateDoc(reqUpdateDocDTO.getContent(), LocalDate.now());
        List<DocFile> docFileList = docFileRepository.findByDocument(findDoc);
        for (DocFile docFile : docFileList) {
            fileNames.add(fileService.findFilePathByFile(docFile.getFile())); //여기서 file이 null
        }


        return ReqUpdateDocDTO.builder()
                .docId(findDoc.getId())
                .content(findDoc.getContent())
                .fileName(fileNames)
                .build();
    }

    public DocDTO showRandDoc() {
        /*사용자가 볼 수 있는 문서인가 확인*/
        List<Documents> documents = docRepository.findAll();

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
