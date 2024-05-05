package smw.capstone.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import smw.capstone.DTO.response.BoardDTO;
import smw.capstone.DTO.request.BoardUploadDTO;
import smw.capstone.DTO.request.BoarUpdatedDTO;
import smw.capstone.common.exception.BusinessException;
import smw.capstone.common.exception.CustomErrorCode;
import smw.capstone.entity.Board;
import smw.capstone.entity.Like;
import smw.capstone.entity.Member;
import smw.capstone.repository.BoardRepository;
import smw.capstone.repository.LikeRepository;
import smw.capstone.repository.MemberRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {

    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    private final LikeRepository likeRepository;

    @Transactional
    public void saveBoard(BoardUploadDTO boardUploadDTO, Member member) {
        if(member == null) {
            throw new BusinessException(CustomErrorCode.ACCESS_DENIED);
        }
        Member findMember = memberRepository.findById(member.getId());
        boardRepository.save(Board.builder()
                .content(boardUploadDTO.getContent())
                .title(boardUploadDTO.getBoardTitle())
                .createAt(LocalDate.now())
                .likes(0)
                .member(findMember)
                .build());
    }

    public List<BoardDTO> getAllBoard(/*사용자정보*/) {
        List<Board> boardList = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "createAt"));
        List<BoardDTO> responseBoardDTO = new ArrayList<>();
        for (Board board : boardList) {
            responseBoardDTO.add(BoardDTO.builder()
                    .boardId(board.getId())
                    .boardTitle(board.getTitle())
                    .createAt(board.getCreateAt())
                    .updateAt(board.getUpdateAt())
                    .memberName(board.getMember().getUsername())
                    .likes(board.getLikes()).build());
        }
        return responseBoardDTO;
    }

    @Transactional
    public void deleteBoard(Long boardId, Member member) {
        Member temp = memberRepository.findById(1L); //임시 데이터
        //멤버가 작성한 글이 맞으면 게시물 삭제
        System.out.println(boardId);
        Board board = boardRepository.findByMemberAndId(temp, boardId).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_MEMBER_BOARD));

        boardRepository.delete(board);
    }

    public BoardDTO getOneBoard(Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_BOARD));
        return BoardDTO.builder()
                .boardId(board.getId())
                .memberName(board.getMember().getUsername())
                .updateAt(board.getUpdateAt())
                .boardTitle(board.getTitle())
                .content(board.getContent())
                .createAt(board.getCreateAt())
                .likes(board.getLikes()).build();
    }

    @Transactional
    public void updateBoard(BoarUpdatedDTO updateBoardDTO, Member member) {
        Member findMember = memberRepository.findById(member.getId());
        Board findBoard = boardRepository.findByMemberAndId(findMember, updateBoardDTO.getBoardId()).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_MEMBER_BOARD));
        findBoard.updateBoard(updateBoardDTO.getContent());
    }

    @Transactional
    public void saveLike(Long id, Member member) {
        //이미 좋아요가 반영되었다면 예외
        Board findBoard = boardRepository.findById(id).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_BOARD));
        Like findLike = likeRepository.findByMemberAndBoard(member, findBoard);

        if (findLike != null) {
            throw new BusinessException(CustomErrorCode.EXIST_LIKE);
        }

        likeRepository.save(Like.builder().board(findBoard).member(member).build());
        int likeCnt = findBoard.getLikes();
        findBoard.updateLike(++likeCnt);
    }

    @Transactional
    public void deleteLike(Long id, Member member) {
        Board findBoard = boardRepository.findById(id).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_BOARD));
        try {
            Like findLike = likeRepository.findByMemberAndBoard(member, findBoard);
            likeRepository.delete(findLike);
            int likeCnt = findBoard.getLikes();
            findBoard.updateLike(--likeCnt);
        } catch (NullPointerException e) {
            throw new BusinessException(CustomErrorCode.NOT_EXIST_LIKE);
        }
    }


}
