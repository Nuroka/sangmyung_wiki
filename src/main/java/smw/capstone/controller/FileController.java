package smw.capstone.controller;

import com.amazonaws.Response;
import com.amazonaws.services.s3.AmazonS3Client;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import smw.capstone.DTO.*;
import smw.capstone.DTO.request.ReqCreateDoc;
import smw.capstone.DTO.request.ReqUpdateDocDTO;
import smw.capstone.DTO.response.DocDTO;
import smw.capstone.DTO.response.DocsIdDTO;
import smw.capstone.DTO.response.ResponseDocDTO;
import smw.capstone.common.annotation.CurrentUser;
import smw.capstone.entity.Member;
import smw.capstone.repository.MemberRepository;
import smw.capstone.service.DocService;
import smw.capstone.service.FileService;

import java.io.IOException;
import java.net.URL;
import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequiredArgsConstructor
@Slf4j
public class FileController {

    private final FileService fileService;
    private final DocService docService;

    /**
     * 파일 업로드
     * TODO: 시큐리티 Authentication 객체 생성하면 api에 적용
     */
//    @PostMapping("/file")
//    public ResponseEntity<?> uploadFile(
//            @Validated @RequestParam("file") MultipartFile file,
//            @Valid @RequestPart(value = "file_info") FileUploadDTO fileUploadDTO,
//            @CurrentUser Member member
//    ) throws Exception {
//        return ok().body(fileService.savefiles(fileUploadDTO, file, member));
//    }
    private final AmazonS3Client amazonS3Client;
    private final MemberRepository memberRepository;


    @PostMapping("/file")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            @Valid @RequestPart(value = "file_info") FileUploadDTO fileUploadDTO,
            @CurrentUser Member member) throws IOException {

//        Member member = memberRepository.findById(1L);

        return ResponseEntity.ok(fileService.saveFile(file, fileUploadDTO, member));

    }

    /**
     * 문서 id로 가져오기 --사용자 인증 통과후 본인이 작성한 문서만 가져올 수 있음
     *
     */
    @GetMapping("/docs")
    public ResponseEntity<?> getDocs(@Valid @RequestBody DocsIdDTO docsIdList) {
        return ResponseEntity.ok().body(docService.getDoc(docsIdList));
    }

    /**
     * 문서 키워드 검색
     *
     */
    @GetMapping("/docs/search")
    public ResponseEntity<?> getKeyWordDocs(String keyword) {
        return ResponseEntity.ok().body(docService.getDocsByKeyword(keyword));
    }

    /**
     * 전체 문서 가져오기
     *
     */
    @GetMapping("docs/all")
    public ResponseEntity<?> getAllDocs() {
        return ResponseEntity.ok().body(docService.findAll("creatAt"));
    }

    /**
     * 내 문서 가져오기
     */
    @GetMapping("/my-docs")
    public ResponseEntity<?> getMyDocs(@CurrentUser Member member) {
        return ResponseEntity.ok().body(docService.getMyDocs(member));
    }

    /**
     * 문서 삭제
     */
    @PostMapping("/docs")
    public ResponseEntity<?> deleteDoc(Long id, @CurrentUser Member member) {
        docService.deleteDoc(id, member);
        return ResponseEntity.ok().body("문서가 삭제 되었습니다.");
    }

    /**
     * 문서 만들기
     */
    @PostMapping("/docs/create")
    public ResponseEntity<?> createDoc(@Valid @RequestBody ReqCreateDoc reqCreateDoc, @CurrentUser Member member) {
        docService.createDoc(reqCreateDoc, member);
        return ResponseEntity.ok().body("문서가 생성되었습니다.");
    }

    /**
     * 문서 편집
     */
    @PutMapping("/docs/edit")
    public ResponseEntity<?> updateDoc(@Valid @RequestBody ReqUpdateDocDTO reqUpdateDocDTO, @CurrentUser Member member) {
        return ResponseEntity.ok().body(docService.updateDoc(reqUpdateDocDTO, member));
    }

    /**
     * 문서 추천
     */
    @GetMapping("/docs/recommend")
    public ResponseEntity<?> recommendDoc() {
        return ResponseEntity.ok().body(docService.showRandDoc());
    }

    /**
     * 최근 변경 내역
     */
    @GetMapping("/docs/recent")
    public ResponseEntity<List<DocDTO>> getUpdateDoc() {
        return ResponseEntity.ok().body(docService.getUpdateDoc());
    }

    /**
     * 최근 변경 내역 역순
     */
    @GetMapping("/docs/recent/reverse")
    public ResponseEntity<List<DocDTO>> getUpdateDocReverse() {
        return ResponseEntity.ok().body(docService.getUpdateDocReverse());
    }

    /**
     * 한개 문서 가져오기
     */
    @GetMapping("/doc")
    public ResponseEntity<?> getOneDoc(Long id) {
        return ResponseEntity.ok().body(docService.getDoc(id));
    }

    /**
     * 문서역사
     */
    @GetMapping("/docs/log")
    public ResponseEntity<List<ResponseDocDTO>> getDocLog(){
        return ResponseEntity.ok().body(docService.getDocLog());
    }

    @GetMapping("/img-url/{imgName}")
    public ResponseEntity<String> getImgUrl(@PathVariable("imgName") String imgName, @CurrentUser Member member) {
//        Member member = memberRepository.findById(1L);
        return ResponseEntity.ok().body(fileService.getImageUrl(imgName, member));
    }

    //TODO: 파일 가져오기

}
