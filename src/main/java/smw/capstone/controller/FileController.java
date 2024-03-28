package smw.capstone.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import smw.capstone.DTO.DocsIdDTO;
import smw.capstone.DTO.FileUploadDTO;
import smw.capstone.entity.Files;
import smw.capstone.service.DocService;
import smw.capstone.service.FileService;

import java.util.List;
import java.util.Map;

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
            @RequestPart(value = "file_info") FileUploadDTO fileUploadDTO
    ) throws Exception {
        System.out.println(fileUploadDTO);
        return ok().body(fileService.savefiles(fileUploadDTO, file));
    }

    /**
     * 문서 id로 가져오기 --사용자 인증 통과후 본인이 작성한 문서만 가져올 수 있음
     * TODO: 시큐리티 Authentication 객체 생성하면 api에 적용
     */
    @GetMapping("/docs")
    public ResponseEntity<?> getDocs(DocsIdDTO docsIdList /*@AuthenticationPrincial pricipalDetails*/) {
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
        return ResponseEntity.ok().body(docService.findAll());
    }


}
