package smw.capstone.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import smw.capstone.DTO.BoardDTO;
import smw.capstone.DTO.BoardUploadDTO;
import smw.capstone.service.BoardService;

import java.util.List;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    /**
     * 게시물 추가
     */
    @PostMapping
    public ResponseEntity<?> saveBoard(@Valid @RequestBody BoardUploadDTO boardUploadDTO/*사용자 정보*/) {
        boardService.saveBoard(boardUploadDTO);
        return ResponseEntity.ok().body("커뮤니티에 글이 등록되었습니다.");
    }

}
