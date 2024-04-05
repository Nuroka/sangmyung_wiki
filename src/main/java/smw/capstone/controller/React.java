package smw.capstone.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import smw.capstone.entity.Member;
import smw.capstone.service.MemberService;

@RestController
@Slf4j
@RequiredArgsConstructor
public class React {

    private final MemberService memberService;



    @RequestMapping("/mypage")
    public ResponseEntity<Member> getUser() {
        Member member = memberService.findByUsername("test");

        return ResponseEntity.ok(member);
    }

    @PostMapping("/user")
    public void login(@RequestParam String userid, @RequestParam String password){
        System.out.println(userid);
        System.out.println(password);
    }

}