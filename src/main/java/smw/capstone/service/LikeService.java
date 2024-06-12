package smw.capstone.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import smw.capstone.common.exception.BusinessException;
import smw.capstone.common.exception.CustomErrorCode;
import smw.capstone.entity.Board;
import smw.capstone.entity.Like;
import smw.capstone.entity.Member;
import smw.capstone.repository.BoardRepository;
import smw.capstone.repository.LikeRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LikeService {
    private final LikeRepository likeRepository;
    private final BoardRepository boardRepository;

    public boolean isMemberLike(Long boardId, Member member) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_BOARD));
        Like like = likeRepository.findByMemberAndBoard(member, board);
        if (like == null) {
            return false;
        } else {
            return true;
        }

    }

    public int findLikesCount(Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_BOARD));

        return likeRepository.findByBoard(board).size();
    }

    @Transactional
    public void deleteLike(Long boardId, Member member) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_BOARD));

        Like like = likeRepository.findByMemberAndBoard(member, board);
        likeRepository.delete(like);
    }
    @Transactional
    public void doLike(Long boardId, Member member) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_BOARD));

        likeRepository.save(Like.builder()
                .board(board)
                .member(member).build());
    }
}

