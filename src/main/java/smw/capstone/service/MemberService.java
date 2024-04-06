package smw.capstone.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import smw.capstone.common.exception.BusinessException;
import smw.capstone.common.exception.CustomErrorCode;
import smw.capstone.entity.Member;
import smw.capstone.repository.MemberRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository mr;

    Member member = new Member();

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
            throw new BusinessException(CustomErrorCode.NOT_EXIST_MEMBER);
        }else if(!requestmember.getPassword().equals(pw)){
            throw new BusinessException(CustomErrorCode.NOT_LOGIN);
        }else{
            return requestmember;
        }
    }

    @Transactional
    public void update(Member member){
        mr.update(member);
    }

    public Member findByUsername(String username) {
        return mr.findByUsername(username);
    }
}
