package smw.capstone.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
public class main {

    @RequestMapping("/?continue")
    public String index(){
        return "index";
    }



}
