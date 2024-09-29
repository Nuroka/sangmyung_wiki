package smw.capstone.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import smw.capstone.DTO.request.ReqCommentDTO;
import smw.capstone.DTO.request.ReqUpdateCommentDTO;
import smw.capstone.DTO.response.CommentDTO;
import smw.capstone.DTO.response.ResponseCommentsDTO;
import smw.capstone.common.annotation.CurrentUser;
import smw.capstone.entity.Member;
import smw.capstone.service.CommentsService;

import java.util.List;

@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
public class CommentController {

    public final CommentsService commentsService;

    /**
     * 댓글 가져오기
     */
    @GetMapping("/board")
    public ResponseEntity<CommentsService.Result> getAllComment(@RequestParam("idx") Long idx) {
        return ResponseEntity.ok().body(commentsService.getAllComment(idx));
    }

    /**
     *
     * 댓글 하나 가져오기
     */
    @GetMapping("/one")
    public ResponseEntity<ResponseCommentsDTO> getComment(@RequestParam("idx") Long idx) {
        return ResponseEntity.ok().body(commentsService.getCommentById(idx));
    }

//    /**
//     * 자식 댓글 가져오기
//     * 부모 id를 가지고 연관된 자식 리스트 반환
//     */
//    @GetMapping("/child")
//    public ResponseEntity<List<ResponseCommentsDTO>> getChileComment(@RequestParam("idx") Long parentId) {
//        return ResponseEntity.ok().body(commentsService.getChildCommentList(parentId));
//    }

    /**
     * 댓글 추가
     */
    @PostMapping
    public ResponseEntity<ResponseCommentsDTO> saveComment(@Valid @RequestBody ReqCommentDTO reqCommentDTO, @CurrentUser Member member) {
        return ResponseEntity.ok().body(commentsService.saveComment(reqCommentDTO, member));
    }

    /**
     * 댓글 수정
     */
    @PutMapping("/edit")
    public ResponseEntity<String> updateComment(@Valid @RequestBody ReqUpdateCommentDTO reqUpdateCommentDTO, @CurrentUser Member member) {
        commentsService.updateComment(reqUpdateCommentDTO, member);
        return ResponseEntity.ok().body("댓글이 수정되었습니다.");
    }

    /**
     * 댓글 삭제
     */
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteComment(Long idx, @CurrentUser Member member) {
        commentsService.deleteComment(idx, member);
        return ResponseEntity.ok().body("댓글이 삭제되었습니다.");
    }

}
