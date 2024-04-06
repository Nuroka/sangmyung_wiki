package smw.capstone.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import smw.capstone.entity.Member;
import smw.capstone.repository.MemberRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository mr;

    @Transactional
    public void register(Member member){
        mr.save(member);
    }

    @Transactional
    public void delete(Member member){
        mr.remove(member);
    }

    @Transactional
    public Member login(String id, String pw){
        Member requestmember = mr.findByUsername(id);

        if(requestmember == null){
            return null;
        }else if(!requestmember.getPassword().equals(pw)){
            throw new IllegalArgumentException("비밀번호가 틀렸습니다.");
        }else{
            return requestmember;
        }
    }

    @Transactional
    public void update(Member member){
        mr.update(member);
    }

}
