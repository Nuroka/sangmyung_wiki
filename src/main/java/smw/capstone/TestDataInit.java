package smw.capstone;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import smw.capstone.entity.*;
import smw.capstone.repository.DocFileRepository;
import smw.capstone.repository.DocRepository;
import smw.capstone.repository.FileRepository;
import smw.capstone.repository.MemberRepository;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class TestDataInit {
    private final MemberRepository memberRepository;
    private final FileRepository fileRepository;
    private final DocRepository docRepository;
    private final DocFileRepository docFileRepository;

//    @PostConstruct
//    @Transactional
    public void init() {
        Member member = new Member();
        member.setUsername("test");
        member.setEmail("test@naver.com");
        member.setPassword("test");
        member.setType(Type.USER);
        member.setStudent_Id(12345678);

        memberRepository.save(member);

        /**
         * init doc data
         */
        Documents documents = Documents.builder()
                .content("content")
                .createAt(LocalDateTime.now())
                .updateAt(LocalDateTime.now())
                .member(member)
                .title("title").build();
        docRepository.save(documents);

        /**
         * init file data
         */
        Files files1 = Files.builder()
                .member(member)
                .Summary("summary")
                .Category("category")
                .License("license")
                .storedFileName("/img/20240230/ex-uuid.jpg")
                .Name("ex.jpg").build();

        Files files2 = Files.builder()
                .member(member)
                .Summary("summary")
                .Category("category")
                .License("license")
                .storedFileName("/img/20240230/ex2-uuid.jpg")
                .Name("ex2.jpg").build();

        Files files3 = Files.builder()
                .member(member)
                .Summary("summary")
                .Category("category")
                .License("license")
                .storedFileName("/img/20240230/new-uuid.jpg")
                .Name("new.jpg").build();
        List<Files> newFiles = new ArrayList<>();
        newFiles.add(files1);
        newFiles.add(files2);
        newFiles.add(files3);
        fileRepository.saveAll(newFiles);

        /**
         * init docfile data
         */
        docFileRepository.save(DocFile.builder()
                .file(files1)
                .document(documents).build());
        docFileRepository.save(DocFile.builder()
                .file(files2)
                .document(documents).build());
    }

}
