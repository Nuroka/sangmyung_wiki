package smw.capstone.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import smw.capstone.DTO.*;
import smw.capstone.DTO.request.ReqCreateDoc;
import smw.capstone.DTO.request.ReqUpdateDocDTO;
import smw.capstone.DTO.response.*;
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
import java.time.LocalDateTime;
import java.util.*;

import static smw.capstone.common.exception.CustomErrorCode.EXIST_DOC_TITLE;
import static smw.capstone.common.exception.CustomErrorCode.NOT_MEMBER_FILE;

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

    public List<ResponseDocDTO> getDocsByKeyword(String keyword) {
        if (keyword == null) {
            throw new BusinessException(CustomErrorCode.NOT_EXIST_KEYWORD);
        }
        List<Documents> findDocs = docRepository.findByKeyword(keyword);
        List<ResponseDocDTO> resDoc = new ArrayList<>();
        for (Documents document : findDocs) {
            resDoc.add(buildResDocDto(document));
        }
        return resDoc;
    }

    public List<DocDTO> findAll(String sort) {
        List<Documents> documents = docRepository.findAll(Sort.by(Sort.Direction.DESC, sort));
        for (Documents d : documents){
            System.out.println(d.getTitle());
        }

        List<DocDTO> docDTO = new ArrayList<>();
        for (Documents document : documents) {
            DocDTO responseDoc = new DocDTO();

            responseDoc.setDocuments(buildResDocDto(document));
            responseDoc.setMemberUsername(document.getMember().getUsername());

            setFileDto(responseDoc, document.getId());
            docDTO.add(responseDoc);
        }

        return docDTO;
    }
public List<DocDTO> findAllReverse(String sort) {
        List<Documents> documents = docRepository.findAll(Sort.by(Sort.Direction.ASC, sort));
        List<DocDTO> docDTO = new ArrayList<>();
        for (Documents document : documents) {
            DocDTO responseDoc = new DocDTO();

            responseDoc.setDocuments(buildResDocDto(document));
            responseDoc.setMemberUsername(document.getMember().getUsername());

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
                .memberUsername(document.getMember().getUsername())
                .createAt(document.getCreateAt())
                .content(document.getContent())
                .id(document.getId()).build();
    }

    public List<DocDTO> getMyDocs(Member member) {
        List<DocDTO> docDto = new ArrayList<>();
        try {
            Member findMember = memberRepository.findById(member.getId()); //임시 데이터, 실행 오류 방지
            List<Documents> documents = docRepository.findByMember(findMember);
            for (Documents document : documents) {
                DocDTO responseDoc = new DocDTO();
                responseDoc.setDocuments(buildResDocDto(document)); //리스트로 된 id 순차적으로 add

                setFileDto(responseDoc, document.getId()); //docid와 연관된 file리스트

                docDto.add(responseDoc);
            }
        } catch (NullPointerException e) {
            throw new BusinessException(CustomErrorCode.NOT_EXIST_DOC);
        }

        return docDto;
    }

    @Transactional
    public void deleteDoc(Long id, Member member) {
        if (id == null) {
            throw new BusinessException(CustomErrorCode.NOT_EXIST_DOC_ID);

        }
        try {
            Documents documents = docRepository.findByIdAndMember(id, member).orElseThrow(() -> new BusinessException(CustomErrorCode.ACCESS_DENIED));
//            docRepository.deleteById(id);
            docRepository.delete(documents);
        } catch (NullPointerException e) {
            throw new BusinessException(CustomErrorCode.NOT_EXIST_DOC_ID);
        }

    }

    @Transactional
    public ReqUpdateDocDTO updateDoc(ReqUpdateDocDTO reqUpdateDocDTO, Member member) {
        if (member == null) {
            throw new BusinessException(CustomErrorCode.ACCESS_DENIED);
        }
        Documents findDoc = docRepository.findById(reqUpdateDocDTO.getDocId()).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_DOC));
        List<String> fileNames = new ArrayList<>();

        docFileService.updateDocFile(reqUpdateDocDTO, reqUpdateDocDTO.getFileName(), member);
        findDoc.updateDoc(reqUpdateDocDTO.getContent(), LocalDateTime.now());
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
                .memberUsername(randDoc.getMember().getUsername())
                .content(randDoc.getContent())
                .build();
        List<FileDTO> fileDTOList = fileService.findFilesByDocId((long) rand);

        return  DocDTO.builder()
                .documents(responseDocDTO)
                .fileDtoList(fileDTOList).build();
    }

    public List<DocDTO> getUpdateDoc() {
        return findAll("updateAt");
    }

    public List<DocDTO> getUpdateDocReverse() {
        return findAllReverse("updateAt");
    }

    @Transactional
    public void createDoc(ReqCreateDoc reqCreateDoc, Member member) {
        if (member == null){
            throw new BusinessException(CustomErrorCode.ACCESS_DENIED);
        }
        if (docRepository.findByTitle(reqCreateDoc.getTitle()) != null) {
            throw new BusinessException(EXIST_DOC_TITLE);
        }
        if (reqCreateDoc.getFileName() != null) {
            List<Files> memberFile = fileService.finByMember(member);
            List<String> getFileName = new ArrayList<>();
            for (Files fileName : memberFile) {
                getFileName.add(fileName.getName());
            }
            for (String file : reqCreateDoc.getFileName()) {
                if (!getFileName.contains(file)) {
                    throw new BusinessException(NOT_MEMBER_FILE);
                }
            }
        }
        docRepository.save(Documents.builder()
                .title(reqCreateDoc.getTitle())
                .member(member)
                .content(reqCreateDoc.getContent())
                .createAt(LocalDateTime.now())
                .updateAt(LocalDateTime.now()).build());

    }

    public DocDTO getDoc(Long id) {
        DocDTO docDto = new DocDTO();

        //doc id 리스트를 받아서 id별로 doc 내용과 파일 찾아주기

        Documents documents = docRepository.findById(id).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_DOC));

        docDto.setDocuments(buildResDocDto(documents)); //리스트로 된 id 순차적으로 add

        setFileDto(docDto, id); //docid와 연관된 file리스트


        return docDto;
    }
}
