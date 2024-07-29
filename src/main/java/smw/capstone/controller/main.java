package smw.capstone.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class main {

    @RequestMapping("/?continue")
    public String index(){
        return "index";
    }

//    @GetMapping("/recent")
//    public ResponseEntity<List<String>> testRecent() {
//        log.info("recent function called");
//        List<String> testContents = new ArrayList<>();
//        testContents.add("recent Content1");
//        testContents.add("recent Content2");
//        return new ResponseEntity<>(testContents, HttpStatus.OK);
//    }
//
//    @GetMapping("/popular")
//    public ResponseEntity<List<String>> testPopular() {
//        log.info("popular function called");
//        List<String> testContents = new ArrayList<>();
//        testContents.add("popular Content1");
//        testContents.add("popular Content2");
//        return new ResponseEntity<>(testContents, HttpStatus.OK);
//    }

}
