package smw.capstone.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import smw.capstone.DTO.request.ReqCommentDTO;
import smw.capstone.DTO.request.ReqUpdateCommentDTO;
import smw.capstone.DTO.response.CommentDTO;
import smw.capstone.DTO.response.ResponseCommentsDTO;
import smw.capstone.common.exception.BusinessException;
import smw.capstone.common.exception.CustomErrorCode;
import smw.capstone.entity.Board;
import smw.capstone.entity.Comments;
import smw.capstone.entity.Member;
import smw.capstone.repository.CommentsRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentsService {

    public final CommentsRepository commentsRepository;
    public final BoardService boardService;

    public Result getAllComment(Long idx) {

        List<Comments> findComments = commentsRepository.findByBoard(boardService.getBoardById(idx));
//        if (findComments.isEmpty()) {
//            throw new BusinessException(CustomErrorCode.NOT_EXIST_COMMENTS);
//        }
        List<CommentDTO> resComments = new ArrayList<>();
        List<ResponseCommentsDTO> responseCommentsDTOS = new ArrayList<>();
        for (Comments comment : findComments) {
            if(comment.getParent() != null){
                continue;
            }
            ResponseCommentsDTO responseCommentsDTO = setResponseCommentsDTO(comment);//부모 댓글 info 초기화
            List<ResponseCommentsDTO> child = getChildCommentList(comment);
            CommentDTO  res = new CommentDTO();
            res.setChild(child);
            res.setParent(responseCommentsDTO);
            resComments.add(res);

        }
        return new Result(resComments);

    }

    @AllArgsConstructor
    @Getter
    public class Result<T> {
        private T data;
    }

    public ResponseCommentsDTO getCommentById(Long idx) {
        Comments findComments = commentsRepository.findById(idx).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_COMMENTS));
//        if (!member.getComments().contains(findComments)) {
//            throw new BusinessException(CustomErrorCode.NOT_EXIST_COMMENTS_BY_MEMBER);
//        }
        return setResponseCommentsDTO(findComments);
    }

    ResponseCommentsDTO setResponseCommentsDTO(Comments comment) {
        return ResponseCommentsDTO.builder()
                .memberName(comment.getMember().getUsername())
                .memberId(comment.getMember().getId())
                .commentId(comment.getId())
                .content(comment.getContent())
                .createAt(comment.getCreateAt())
                .updateAt(comment.getUpdateAt())
                .build();
    }

    @Transactional
    public ResponseCommentsDTO saveComment(ReqCommentDTO reqCommentDTO, Member member) {
        Comments parent = null;
        if (reqCommentDTO.getParentId() != null){
            parent = commentsRepository.findById(reqCommentDTO.getParentId()).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_COMMENTS));
        }
        Comments comments = Comments.builder()
                .board(boardService.getBoardById(reqCommentDTO.getBoardId()))
                .content(reqCommentDTO.getContent())
                .createAt(LocalDateTime.now())
                .updateAt(LocalDateTime.now())
                .parent(parent)
                .member(member).build();
        commentsRepository.save(comments);

        return setResponseCommentsDTO(comments).setMemberName(member.getUsername());
    }

    @Transactional
    public void updateComment(ReqUpdateCommentDTO reqUpdateCommentDTO, Member member) {
        Comments comments = commentsRepository.findById(reqUpdateCommentDTO.getCommentId())
                .orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_COMMENTS));
        if (!Objects.equals(comments.getMember().getId(), member.getId())) {
            throw new BusinessException(CustomErrorCode.NOT_EXIST_COMMENTS_BY_MEMBER);
        }
        comments.updateContent(reqUpdateCommentDTO.getContent());
    }

    @Transactional
    public void deleteComment(Long idx, Member member) {
        Comments comments = commentsRepository.findById(idx)
                .orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_COMMENTS));
        if (!comments.getMember().getId().equals(member.getId())) {
            throw new BusinessException(CustomErrorCode.NOT_EXIST_COMMENTS_BY_MEMBER);
        }

        commentsRepository.delete(comments);
    }


    public List<ResponseCommentsDTO> getChildCommentList(Comments parent) {
        List<ResponseCommentsDTO> childCommentList = new ArrayList<>();
        List<Comments> childComments = commentsRepository.findByParent(parent);
        for (Comments c : childComments) {
            childCommentList.add(setResponseCommentsDTO(c));
        }
        return childCommentList;
    }
}
