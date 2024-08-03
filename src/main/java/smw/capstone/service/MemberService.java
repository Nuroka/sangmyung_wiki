package smw.capstone.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
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

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository mr;
    private final EmailProvider emailProvider;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public ResponseEntity<?> register(Member member) {
        member.setPassword(passwordEncoder.encode(member.getPassword()));
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
        } else if (!passwordEncoder.matches(pw, requestmember.getPassword())) {
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

    @Transactional
    public void updatePw(Member member, String newPw) {
        member.setPassword(passwordEncoder.encode(newPw));
        mr.update(member);
    }

    public Member findByUsername(String username) {
        return mr.findByUsername(username);
    }

    @Transactional
    public void signin_sendNumber(String email) {
        removeExistCertification(email);
        //인증코드 생성 함수
        String code = emailProvider.randomCode();
        //함수 호출될때 들어온 email로 code 발송
        emailProvider.sendCertificationMail(email, code);
        //email, code를 SigininCode Table에 저장
        SigninCode target = new SigninCode();
        target.setEmail(email);
        target.setCertification_Code(code);
        target.setTime(LocalDateTime.now());
        mr.certificate_process(target);
    }

    @Transactional
    public void findid_sendNumber(String email) {
        removeExistCertification(email);
        try {
            Member m = mr.findMemberByEmail(email);
        }catch(Exception e){
            throw new BusinessException(CustomErrorCode.NOT_MATCHED_EMAIL);
        }
        //인증코드 생성 함수
        String code = emailProvider.randomCode();
        //함수 호출될때 들어온 email로 code 발송
        emailProvider.sendCertificationMail(email, code);
        //email, code를 SigininCode Table에 저장
        SigninCode target = new SigninCode();
        target.setEmail(email);
        target.setCertification_Code(code);
        target.setTime(LocalDateTime.now());
        mr.certificate_process(target);
    }

    @Transactional
    public void findpw_sendNumber(String email, String username) {
        removeExistCertification(email);
        Member m = mr.findMemberByEmail(email);
        if (m == null) {
            throw new BusinessException(CustomErrorCode.NOT_MATCHED_EMAIL);
        }
        if (m.getUsername().equals(username)) {
            //인증코드 생성 함수
            String code = emailProvider.randomCode();
            //함수 호출될때 들어온 email로 code 발송
            emailProvider.sendCertificationMail(email, code);
            //email, code를 SigininCode Table에 저장
            SigninCode target = new SigninCode();
            target.setEmail(email);
            target.setCertification_Code(code);
            target.setTime(LocalDateTime.now());
            mr.certificate_process(target);
        } else {
            throw new BusinessException(CustomErrorCode.NOT_MATCHED_EMAIL_USERNAME);
        }
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

    @Transactional
    public boolean certificate_v2(String email, String code) {
        String answer = mr.findCode(email);
        if (!answer.equals(code)) {
            throw new BusinessException(CustomErrorCode.NOT_MATCHED_CODE);
        }else{
            Emailcertificatelog emaillog = new Emailcertificatelog();
            SigninCode signinCode = mr.findsignincode(code);
            emaillog.setEmail(signinCode.getEmail());
            emaillog.setCertification_Code(signinCode.getCertification_Code());
            emaillog.setTime(signinCode.getTime());
            mr.removeSigninCode(signinCode);
            mr.saveEmaillog(emaillog);

            return true;
        }
    }

    private void removeExistCertification(String email) {
        //기존 인증 코드 제거
        String existCertification = mr.findCode(email);
        if (existCertification != null) {
            mr.removeSigninCode(mr.findsignincode(existCertification));
        }
    }
}
