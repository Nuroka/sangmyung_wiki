package smw.capstone;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import smw.capstone.entity.Member;
import smw.capstone.repository.MemberRepository;

@Component
@RequiredArgsConstructor
public class TestDataInit {
    private final MemberRepository memberRepository;

    @PostConstruct
    @Transactional
    public void init(){
        Member member = new Member();
        member.setID("test");
        member.setEmail("test@naver.com");
        member.setPassword("test");
        member.setAdmin_Type("false");
        member.setStudent_Id(12345678);

        memberRepository.save(member);
    }
}
