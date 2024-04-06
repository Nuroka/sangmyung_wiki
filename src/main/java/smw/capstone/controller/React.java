package smw.capstone.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import smw.capstone.entity.Member;
import smw.capstone.repository.MemberRepository;
import smw.capstone.service.MemberService;

@RestController
@Slf4j
@RequiredArgsConstructor
public class React {

    private final MemberService memberService;
    private final MemberRepository memberRepository;


    @RequestMapping("/mypage")
    public ResponseEntity<Member> getUser() {
        Member member = memberRepository.findByUsername("test");

        return ResponseEntity.ok(member);
    }

    @GetMapping("/user")
    public void login(@RequestParam String userid, @RequestParam String password) {
        System.out.println(userid);
        System.out.println(password);
    }

}