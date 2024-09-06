package smw.capstone.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import smw.capstone.DTO.LoginDTO;
import smw.capstone.DTO.request.*;
import smw.capstone.DTO.response.MemberInfoDTO;
import smw.capstone.common.annotation.CurrentUser;
import smw.capstone.common.exception.BusinessException;
import smw.capstone.common.exception.CustomErrorCode;
import smw.capstone.common.provider.JwtProvider;
import smw.capstone.entity.Member;
import smw.capstone.entity.Type;
import smw.capstone.repository.MemberRepository;
import smw.capstone.service.FileService;
import smw.capstone.service.MemberService;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api")
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final FileService fileService;

    private Map<String, String> store = new ConcurrentHashMap<>();

    @RequestMapping("/mypage")
    public ResponseEntity<?> getUser(@CurrentUser Member member) {

        MemberInfoDTO build = MemberInfoDTO.builder()
                .username(member.getUsername())
                .email(member.getEmail())
                .filelist(fileService.getImageUrlByUser(member))
                .build();
        return ResponseEntity.ok().body(build);
    }

    @PostMapping("/user")
    public ResponseEntity<Long> login(HttpServletResponse response, @RequestBody LoginDTO form){
        Member member = new Member();
        member = memberService.login(form.getUsername(), form.getPassword());
        jwtProvider.sendAccessToken(response, jwtProvider.create(member.getEmail()));
        Member memberId = memberRepository.findByUsername(form.getUsername());
        return ResponseEntity.ok().body(memberId.getId());
    }

    @PostMapping("/signin/email/1")
    public ResponseEntity<?> certificateEmail(@RequestBody EmailDTO form){
        if (memberService.findByEmail(form.getEmail()) != null) {
            throw new BusinessException(CustomErrorCode.EXIST_USERNAME);
        }
        String email = form.getEmail();
        memberService.signin_sendNumber(email);

        return ResponseEntity.ok().body("인증번호가 전송되었습니다.");
    }

    @PostMapping("/signin/email/2")
    public ResponseEntity<?> certification(@RequestBody EmailDTO form) {
        String email = form.getEmail();
        String code = form.getCode();

        return memberService.certificate(email, code);
    }

    @PostMapping("/signin/ID")
    public ResponseEntity<?> signup(@RequestBody SignUpRequestDTO form){
        Member member = new Member();

        member.setEmail(form.getEmail());
        member.setUsername(form.getUsername());
        member.setPassword(form.getPassword());
        member.setStudent_Id(form.getStudent_Id());
        member.setType(Type.USER);

        return memberService.register(member);
    }

    @PostMapping("/find/ID/1")
    public ResponseEntity<?> findingID(@RequestBody EmailDTO form){
        if (memberService.findByEmail(form.getEmail()) == null) {
            throw new BusinessException(CustomErrorCode.NOT_MATCHED_EMAIL);
        }
        String email = form.getEmail();
        memberService.findid_sendNumber(email);

        return ResponseEntity.ok().body("인증번호가 전송되었습니다.");
    }

    @PostMapping("/find/ID/2")
    public ResponseEntity<String> findingID2(@RequestBody EmailDTO form) {
        String email = form.getEmail();
        String code = form.getCode();
        Member member = new Member();
        if(memberService.certificate_v2(email, code)){
            member = memberService.findByEmail(email);
        }
        return ResponseEntity.ok().body("사용자의 아이디는 '" + member.getUsername() + "' 입니다.");
    }

    @PostMapping("/find/pw/1")
    public ResponseEntity<?> findPW2(@RequestBody FindPwDTO form){
        if (memberService.findByEmail(form.getEmail()) == null) {
            throw new BusinessException(CustomErrorCode.NOT_MATCHED_EMAIL);
        }
        String email = form.getEmail();
        String username = form.getUsername();
        memberService.findpw_sendNumber(email, username);

        return ResponseEntity.ok().body("인증번호가 발송되었습니다.");
    }

    @PostMapping("/find/pw/2")
    public ResponseEntity<?> findingPW2(@RequestBody FindPwDTO form) {
        String email = form.getEmail();
        String code = form.getCode();

        String uuid = UUID.randomUUID().toString();
        if (memberService.certificate_v2(email, code)) {
            Member member = memberService.findByEmail(email);
            store.put(uuid, member.getEmail());
        }

        return ResponseEntity.ok().body(uuid);
    }

    @PostMapping("/find/pw/3")
    public ResponseEntity<String> findingPW3(@RequestBody NewPWDTO form){
        if (form.getPw().equals(form.getPw2())) {
            String memberEmail = store.getOrDefault(form.getUuid(), null);
            if (memberEmail != null) {
                Member member = memberService.findByEmail(memberEmail);
                memberService.updatePw(member, form.getPw());
                store.remove(form.getUuid());
            }
        } else {
            throw new BusinessException(CustomErrorCode.NOT_MATCHED_PASSWORD);
        }

        return ResponseEntity.ok().body("비밀번호 변경이 완료되었습니다. 바뀐 비밀번호로 로그인해주세요.");
    }

    @PostMapping("/member/update")
    public ResponseEntity<?> updatePw(@CurrentUser Member member, @RequestBody UpdatePwDTO form) {
        if (!passwordEncoder.matches(form.getPw(), member.getPassword())) {
            throw new BusinessException(CustomErrorCode.NOT_MATCHED_PASSWORD);
        }
        memberService.updatePw(member, form.getPw2());

        return ResponseEntity.ok().body("변경완료");
    }

    @PostMapping("/duplicate")
    public ResponseEntity<?> checkDuplicate(@RequestBody FindPwDTO form) {
        if (memberService.findByUsername(form.getUsername()) != null) {
            throw new BusinessException(CustomErrorCode.EXIST_USERNAME);
        }
        return ResponseEntity.ok().body("사용 가능한 아이디입니다.");
    }
}