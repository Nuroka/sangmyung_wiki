package smw.capstone.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import smw.capstone.DTO.LoginDTO;
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

}