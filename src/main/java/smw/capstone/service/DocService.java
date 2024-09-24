package smw.capstone.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
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
import smw.capstone.entity.*;
import smw.capstone.repository.*;

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
    private final DocLogRepository docLogRepository;
    private final FileRepository fileRepository;
    private final DocLogRepository logRepository;


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
    public void deleteDoc(Long id) {
        if (id == null) {
            throw new BusinessException(CustomErrorCode.NOT_EXIST_DOC_ID);
        }
        try {
//            Documents documents = docRepository.findByIdAndMember(id, member).orElseThrow(() -> new BusinessException(CustomErrorCode.ACCESS_DENIED));
            Documents documents = docRepository.findById(id).orElse(null);
//            docRepository.deleteById(id);
            if (documents != null) {
                docRepository.delete(documents);
            }
        } catch (NullPointerException e) {
            throw new BusinessException(CustomErrorCode.NOT_EXIST_DOC_ID);
        }

    }

    @Transactional
    public ReqUpdateDocDTO updateDoc(ReqUpdateDocDTO reqUpdateDocDTO, Member member) {
        if (member == null) {
            throw new BusinessException(CustomErrorCode.ACCESS_DENIED);
        }
        //업데이트할 문서 찾기
        Documents findDoc = docRepository.findById(reqUpdateDocDTO.getDocId())
                .orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_DOC));
        List<String> fileNames = new ArrayList<>();

        Files findFile = null;
        if (reqUpdateDocDTO.getUpdateFile() != null) {
            findFile = fileRepository.findByMemberAndName(member, reqUpdateDocDTO.getUpdateFile());

            if (findFile == null) {
                throw new BusinessException(CustomErrorCode.NOT_MEMBER_FILE);
            }
        }


        //업데이트할 문서에서 content랑 file을 변경하면 됨
        LocalDateTime timestamp = LocalDateTime.now();
        findDoc.updateDoc(reqUpdateDocDTO.getContent(), timestamp, findFile);

        logRepository.save(DocLog.builder()
                        .documentsId(findDoc)
                        .timestamp(timestamp)
                        .log(reqUpdateDocDTO.getContent())
                        .files(findFile)
                .build());

        String fileName = findFile == null ? null : findFile.getName();
        return ReqUpdateDocDTO.builder()
                .docId(findDoc.getId())
                .content(findDoc.getContent())
                .updateFile(fileName)
                .build();
    }

    public DocDTO showRandDoc() {
        /*사용자가 볼 수 있는 문서인가 확인*/
        List<Documents> documents = docRepository.findAll();

        int rand = (int) (Math.random() * documents.size());
        Documents randDoc = documents.get(rand);

        ResponseDocDTO responseDocDTO = ResponseDocDTO.builder()
                .id(randDoc.getId())
                .title(randDoc.getTitle())
                .createAt(randDoc.getCreateAt())
                .updateAt(randDoc.getUpdateAt())
                .memberUsername(randDoc.getMember().getUsername())
                .content(randDoc.getContent())
                .build();
        List<FileDTO> fileDTOList = fileService.findFilesByDocId(randDoc.getId());

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

//            List<String> getFileName = new ArrayList<>();
            if (!memberFile.contains(reqCreateDoc.getFileName())) {
                throw new BusinessException(NOT_MEMBER_FILE);
            } //파일 한개 업로드 했는데 그게 해당유저가 올린게 아니라면 예외
//            for (String file : reqCreateDoc.getFileName()) {
//                if (!getFileName.contains(file)) {
//                    throw new BusinessException(NOT_MEMBER_FILE);
//                }
//            }
        }

        Files findFile = fileRepository.findByName(reqCreateDoc.getFileName());
        Documents newDoc = Documents.builder()
                .title(reqCreateDoc.getTitle())
                .member(member)
                .content(reqCreateDoc.getContent())
                .createAt(LocalDateTime.now())
                .filesId(findFile)
                .updateAt(LocalDateTime.now()).build();
        docRepository.save(newDoc);

        docLogRepository.save(DocLog.builder()
                        .documentsId(newDoc)
                        .timestamp(newDoc.getCreateAt())
                        .log(newDoc.getContent())
                        .files(fileRepository.findByName(reqCreateDoc.getFileName()))
                .build());


    }

    public DocDTO getDoc(Long id) {
        DocDTO docDto = new DocDTO();

        //doc id 리스트를 받아서 id별로 doc 내용과 파일 찾아주기

        Documents documents = docRepository.findById(id).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_DOC));

        docDto.setDocuments(buildResDocDto(documents)); //리스트로 된 id 순차적으로 add

        setFileDto(docDto, id); //docid와 연관된 file리스트


        return docDto;
    }

    //문서 전체 반환하기
    public List<ResponseDocDTO> getDocLog() {
        List<Documents> documents = docRepository.findAll();
        List<ResponseDocDTO> resDocDTO = new ArrayList<>();
        for (Documents doc : documents) {
            resDocDTO.add(buildResDocDto(doc));
        }
        return resDocDTO;
    }

    public List<ResponseDocDTO> getDocLogById(Long docId) {
//        List<Documents> documents = docLogRepository.findAll();
        Documents doc = docRepository.findById(docId).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_DOC));
        List<DocLog> findDogLogs = docLogRepository.findByDocumentsId(doc);
        List<ResponseDocDTO> resDocLog = new ArrayList<>();

        for (DocLog docLog : findDogLogs) {
            resDocLog.add(buildResDocDto(docLog, doc));
        }
        return resDocLog;
    }

    public ResponseDocDTO buildResDocDto(DocLog doclog, Documents documents) {
        return ResponseDocDTO.builder()
                .title(documents.getTitle())
                .updateAt(doclog.getTimestamp())
                .memberUsername(documents.getMember().getUsername())
                .createAt(documents.getCreateAt())
                .content(doclog.getLog())
                .id(doclog.getId()).build();
    }



}
