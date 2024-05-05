package smw.capstone.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import smw.capstone.DTO.response.BoardDTO;
import smw.capstone.DTO.request.BoardUploadDTO;
import smw.capstone.DTO.request.BoarUpdatedDTO;
import smw.capstone.common.annotation.CurrentUser;
import smw.capstone.entity.Member;
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
    public ResponseEntity<?> saveBoard(@Valid @RequestBody BoardUploadDTO boardUploadDTO, @CurrentUser Member member) {
        boardService.saveBoard(boardUploadDTO, member);
        return ResponseEntity.ok().body("커뮤니티에 글이 등록되었습니다.");
    }

    /**
     * 전체 게시물 보기
     */
    @GetMapping
    public ResponseEntity<List<BoardDTO>> getAllBoard() {
        return ResponseEntity.ok().body(boardService.getAllBoard());
    }

    /**
     * 게시물 삭제
     */
    @DeleteMapping("/delete")
    public ResponseEntity<String> delBoard(Long boardId, @CurrentUser Member member) {
        boardService.deleteBoard(boardId, member);
        return ResponseEntity.ok().body("게시물이 삭제되었습니다.");
    }

    /**
     * 게시물 하나 가져오기
     */
    @GetMapping("/one")
    public ResponseEntity<BoardDTO> getOneBoard(Long id) {
        return ResponseEntity.ok().body(boardService.getOneBoard(id));
    }

    /**
     * 게시물 수정
     */
    @PostMapping("/edit")
    public ResponseEntity<?> updateBoard(@Valid @RequestBody BoarUpdatedDTO updateBoardDTO, @CurrentUser Member member) {
        boardService.updateBoard(updateBoardDTO, member);
        return ResponseEntity.ok().body("게시물이 수정되었습니다.");
    }

}
