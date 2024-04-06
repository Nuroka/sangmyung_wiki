package smw.capstone.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import smw.capstone.DTO.*;
import smw.capstone.service.DocService;
import smw.capstone.service.FileService;

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
    @PostMapping("/file")
    public ResponseEntity<?> uploadFile(
            @Validated @RequestParam("file") MultipartFile file,
            @Valid @RequestPart(value = "file_info") FileUploadDTO fileUploadDTO
    ) throws Exception {
        return ok().body(fileService.savefiles(fileUploadDTO, file));
    }

    /**
     * 문서 id로 가져오기 --사용자 인증 통과후 본인이 작성한 문서만 가져올 수 있음
     * TODO: 시큐리티 Authentication 객체 생성하면 api에 적용
     */
    @GetMapping("/docs")
    public ResponseEntity<?> getDocs(@Valid @RequestBody DocsIdDTO docsIdList /*@AuthenticationPrincial pricipalDetails*/) {
        return ResponseEntity.ok().body(docService.getDoc(docsIdList));
    }

    /**
     * 문서 키워드 검색
     * TODO: 시큐리티 Authentication 객체 생성하면 api에 적용
     */
    @GetMapping("/docs/search")
    public ResponseEntity<?> getKeyWordDocs(String keyword) {
        return ResponseEntity.ok().body(docService.getDocsByKeyword(keyword));
    }

    /**
     * 전체 문서 가져오기
     * TODO: 시큐리티 Authentication 객체 생성하면 api에 적용
     */
    @GetMapping("docs/all")
    public ResponseEntity<?> getAllDocs() {
        return ResponseEntity.ok().body(docService.findAll("creatAt"));
    }

    /**
     * 내 문서 가져오기
     */
    @GetMapping("/my-docs")
    public ResponseEntity<?> getMyDocs(/*토큰 구현 되면 추가*/) {
        return ResponseEntity.ok().body(docService.getMyDocs(/*인증정보*/));
    }

    /**
     * 문서 삭제
     */
    @PostMapping("/docs")
    public ResponseEntity<?> deleteDoc(Long id /*사용자 확인후 삭제 가능한 문서면 삭제*/) {
        docService.deleteDoc(id/*사용자 인증정보*/);
        return ResponseEntity.ok().body("문서가 삭제 되었습니다.");
    }

    /**
     * 문서 만들기
     */
    @PostMapping("/docs/create")
    public ResponseEntity<?> createDoc(/*사용자정보*/@Valid ReqCreateDoc reqCreateDoc) {
        docService.createDoc(reqCreateDoc);
        return ResponseEntity.ok().body("문서가 생성되었습니다.");
    }

    /**
     * 문서 편집
     */
    @PostMapping("/docs/edit")
    public ResponseEntity<?> updateDoc(@Valid @RequestBody ReqUpdateDocDTO reqUpdateDocDTO/*사용자 정보*/) {
        return ResponseEntity.ok().body(docService.updateDoc(reqUpdateDocDTO));
    }

    /**
     * 문서 추천
     */
    @GetMapping("/docs/recommend")
    public ResponseEntity<?> recommendDoc(/*사용자 정보*/) {
        return ResponseEntity.ok().body(docService.showRandDoc());
    }

    /**
     * 최근 변경 내역
     */
    @GetMapping("/docs/edit")
    public ResponseEntity<List<DocDTO>> getUpdateDoc(/*사용자 정보*/) {
        return ResponseEntity.ok().body(docService.getUpdateDoc());
    }
}
