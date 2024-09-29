package smw.capstone.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import smw.capstone.DTO.response.BoardDTO;
import smw.capstone.DTO.request.BoardUploadDTO;
import smw.capstone.DTO.request.BoarUpdatedDTO;
import smw.capstone.DTO.response.LikeDTO;
import smw.capstone.common.annotation.CurrentUser;
import smw.capstone.entity.Member;
import smw.capstone.service.BoardService;
import smw.capstone.service.LikeService;

import java.util.List;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;
    private final LikeService likeService;

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
    @GetMapping("/all")
    public ResponseEntity<List<BoardDTO>> getAllBoard() {
        return ResponseEntity.ok().body(boardService.getAllBoard());
    }

    /**
     * 게시물 삭제
     */
    @DeleteMapping("/delete")
    public ResponseEntity<String> delBoard(@RequestParam("id") Long boardId, @CurrentUser Member member) {
        boardService.deleteBoard(boardId, member);
        return ResponseEntity.ok().body("게시물이 삭제되었습니다.");
    }

    /**
     * 게시물 하나 가져오기
     */
    @GetMapping("/one")
    public ResponseEntity<BoardDTO> getOneBoard(@RequestParam("idx") Long id, @RequestParam("member_id") Long memberId) {
        return ResponseEntity.ok().body(boardService.getOneBoard(id, memberId));
    }

    /**
     * 게시물 수정
     */
    @PutMapping("/edit")
    public ResponseEntity<?> updateBoard(@Valid @RequestBody BoarUpdatedDTO updateBoardDTO, @CurrentUser Member member) {
        boardService.updateBoard(updateBoardDTO, member);
        return ResponseEntity.ok().body("게시물이 수정되었습니다.");
    }

    /**
     * 게시물 추천
     */
    @PostMapping("like")
    public ResponseEntity<?> saveLike(@RequestParam("board_id") Long id, @CurrentUser Member member) {
        boardService.saveLike(id, member);
        return ResponseEntity.ok().body("좋아요가 반영되었습니다.");
    }

    /**
     * 게시물 추천 취소하기
     */
    @PostMapping("like/delete")
    public ResponseEntity<?> deleteLike(@RequestParam("board_id") Long id, @CurrentUser Member member) {
        boardService.deleteLike(id, member);
        return ResponseEntity.ok().body("좋아요가 취소되었습니다.");
    }

    /**
     * 인기 게시물 보기 (추천 순)
     * 추천 수가 동일할 경우 최근 생성일 기준으로
     */
    @GetMapping("/popular")
    public ResponseEntity<?> getPopularBoard() {
        return ResponseEntity.ok().body(boardService.getPopularBoard());
    }

    @GetMapping("/like")
    public ResponseEntity<?> getLikes(@RequestParam("idx") Long boardId, @CurrentUser Member member) {
        System.out.println(boardId);
        if (!likeService.isMemberLike(boardId, member)) {
            //사용자가 좋아요를 눌러서 like가 증가하는 경우
            //DB에서 좋아요 수 찾아서 return
            likeService.doLike(boardId, member);

        } else {
            //사용자가 좋아요를 취소하는 경우
            //DB에 좋아요 취소하고 like 감소
            likeService.deleteLike(boardId, member);
        }

        //isLike가 true이면 사용자가 하트는 취소하는 경우 -> 클라이언트에게 false로 반환
        LikeDTO likeDTO = new LikeDTO(likeService.isMemberLike(boardId, member), likeService.findLikesCount(boardId));
        return ResponseEntity.ok().body(likeDTO);
    }
}
