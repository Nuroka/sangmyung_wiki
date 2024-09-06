package smw.capstone.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import smw.capstone.DTO.request.ReqUpdateDocDTO;
import smw.capstone.common.exception.BusinessException;
import smw.capstone.common.exception.CustomErrorCode;
import smw.capstone.entity.DocFile;
import smw.capstone.entity.Documents;
import smw.capstone.entity.Files;
import smw.capstone.entity.Member;
import smw.capstone.repository.DocFileRepository;
import smw.capstone.repository.DocRepository;
import smw.capstone.repository.MemberRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class DocFileService {

    public final DocFileRepository docFileRepository;
    public final DocRepository docRepository;
    public final FileService fileService;
    public final MemberRepository memberRepository;

    private DocFile buildDocFile(String updateFile, Documents updateDoc, Member temp) {
        return DocFile.builder()
                .document(updateDoc)
                .file(fileService.finByMemberAndFileName(temp, updateFile)).build();
    }

    private static List<String> getFileNameList(List<DocFile> docFileList) {
        List<String> fileNameList = new ArrayList<>();
        for (DocFile docFile : docFileList) {
            fileNameList.add(docFile.getFile().getName());
        }
        return fileNameList;
    }

    public void saveDocFile(DocFile docFile) {
        docFileRepository.save(docFile);
    }

    public void deleteDocFileByDoc(Documents documents) {
        docFileRepository.deleteAllByDocument(documents);
    }

    public List<DocFile> getDocFileByDocument(Documents documents) {
        return docFileRepository.findByDocument(documents);
    }

    public List<DocFile> findDocfileByDocId(Long docId) {
        return docFileRepository.findByDocumentId(docId);
    }


}

