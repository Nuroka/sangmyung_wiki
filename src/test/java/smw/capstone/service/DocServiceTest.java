package smw.capstone.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import smw.capstone.DTO.ReqUpdateDocDTO;
import smw.capstone.entity.DocFile;
import smw.capstone.entity.Documents;
import smw.capstone.entity.Files;
import smw.capstone.entity.Member;
import smw.capstone.repository.DocFileRepository;
import smw.capstone.repository.DocRepository;
import smw.capstone.repository.FileRepository;
import smw.capstone.repository.MemberRepository;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@Transactional
@SpringBootTest
public class DocServiceTest {

    @Autowired DocService docService;
    @Autowired DocRepository docRepository;
    @Autowired DocFileRepository docFileRepository;
    @Autowired MemberRepository memberRepository;
    @Autowired FileRepository fileRepository;

    @Test
    public void 문서업데이트() throws Exception {

        //Given
        Member member = memberRepository.findById(1L);
        Documents doc = docRepository.findByIdAndMember(1L, member);

        List<String> fileNames = new ArrayList<>();
        fileNames.add("ex.jpg");
        fileNames.add("new.jpg");

        ReqUpdateDocDTO updateDoc = ReqUpdateDocDTO.builder()
                .docId(doc.getId())
                .content("update")
                .fileName(fileNames).build();

        //When
        docService.updateDoc(updateDoc);


        //Then
        List<String> originalFileName = new ArrayList<>();
        for (DocFile docfile : docFileRepository.findByDocument(doc)) {
            originalFileName.add(docfile.getFile().getName());
        }
        assertEquals(doc.getContent(), "update"); //업데이트된 내용 반영확인
        assertEquals(originalFileName, fileNames); //업데이트된 파일 확인

    }

}