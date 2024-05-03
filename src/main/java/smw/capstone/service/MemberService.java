package smw.capstone.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import smw.capstone.common.exception.BusinessException;
import smw.capstone.common.exception.CustomErrorCode;
import smw.capstone.common.provider.EmailProvider;
import smw.capstone.common.provider.JwtProvider;
import smw.capstone.entity.Emailcertificatelog;
import smw.capstone.entity.Member;
import smw.capstone.entity.SigninCode;
import smw.capstone.repository.MemberRepository;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository mr;
    private final EmailProvider emailProvider;
    private final JwtProvider jwtProvider;
    Member member = new Member();

    @Transactional
    public ResponseEntity<?> register(Member member) {
        mr.save(member);
        return ResponseEntity.ok().body("회원가입 완료되었습니다.");
    }

    @Transactional
    public void delete(Member member) {
        mr.remove(member);
    }

    @Transactional
    public Member login(String id, String pw) {
        Member requestmember = mr.findByUsername(id);
        if (requestmember == null) {
            throw new BusinessException(CustomErrorCode.NOT_EXIST_MEMBER);
        } else if (!requestmember.getPassword().equals(pw)) {
            throw new BusinessException(CustomErrorCode.NOT_LOGIN);
        } else {
            jwtProvider.create(requestmember.getEmail());

            return requestmember;
        }
    }

    @Transactional
    public void update(Member member) {
        mr.update(member);
    }

    public Member findByUsername(String username) {
        return mr.findByUsername(username);
    }

    @Transactional
    public void sendNumber(String email) {
        //인증코드 생성 함수
        String code = emailProvider.randomCode();
        //함수 호출될때 들어온 email로 code 발송
        emailProvider.sendCertificationMail(email, code);
        //email, code를 SigininCode Table에 저장
        SigninCode target = new SigninCode();
        target.setEmail(email);
        target.setCertification_Code(code);
        mr.certificate_process(target);

    }

    public ResponseEntity<?> certificate(String email, String code) {
        String answer = mr.findCode(email);
        if (!answer.equals(code)){
            throw new BusinessException(CustomErrorCode.NOT_MATCHED_CODE);
        }else{
            Map<String, String> response = new HashMap<>();
            response.put("message", "인증되었습니다");
            response.put("email", email);
            return ResponseEntity.ok().body(response);
        }
    }

    public Member findByEmail(String email){ return mr.findMemberByEmail(email);}

    public boolean certificate_v2(String email, String code) {
        String answer = mr.findCode(email);
        if (!answer.equals(code)) {
            throw new BusinessException(CustomErrorCode.NOT_MATCHED_CODE);
        }else{
            Emailcertificatelog emaillog = new Emailcertificatelog();
            SigninCode signinCode = mr.findsignincode(code);
            emaillog.setEmail(signinCode.getEmail());
            emaillog.setCertification_Code(signinCode.getCertification_Code());

            mr.removeSigninCode(signinCode);
            mr.saveEmaillog(emaillog);

            return true;
        }
    }
}
