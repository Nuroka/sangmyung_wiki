package smw.capstone.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import smw.capstone.DTO.LoginDTO;
import smw.capstone.DTO.request.EmailDTO;
import smw.capstone.entity.Member;
import smw.capstone.repository.MemberRepository;
import smw.capstone.service.MemberService;

@RestController
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;


    @RequestMapping("/mypage")
    public ResponseEntity<Member> getUser() {
        Member member = memberRepository.findByUsername("test");

        return ResponseEntity.ok(member);
    }

    @GetMapping("/user")
    public LoginDTO user() {
        return new LoginDTO();
    }

    @PostMapping("/user")
    public ResponseEntity<Member> login(@RequestBody LoginDTO form){
        Member member = new Member();
        member = memberService.login(form.getUsername(), form.getPassword());

        return ResponseEntity.ok(member);
    }

    @GetMapping("/signin/email")
    public EmailDTO email() { return new EmailDTO();}

    @PostMapping("/signin/email/1")
    public ResponseEntity<?> certificateEmail(@RequestBody EmailDTO form){
        String email = form.getEmail();
        memberService.sendNumber(email);

        return ResponseEntity.ok().body("인증번호가 전송되었습니다.");
    }

    @PostMapping("/signin/email/2")
    public ResponseEntity<?> certification(@RequestBody EmailDTO form) {
        String email = form.getEmail();
        String code = form.getCode();

        return memberService.certificate(email, code);
    }

}