package smw.capstone.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import smw.capstone.DTO.*;
import smw.capstone.entity.DocFile;
import smw.capstone.entity.Documents;
import smw.capstone.entity.Files;
import smw.capstone.repository.DocFileRepository;
import smw.capstone.repository.DocRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class DocService {

    private final DocRepository docRepository;
    private final DocFileRepository docFileRepository;

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
}
