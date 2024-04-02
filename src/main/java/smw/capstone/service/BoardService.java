package smw.capstone.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import smw.capstone.DTO.BoardDTO;
import smw.capstone.DTO.BoardUploadDTO;
import smw.capstone.common.exception.BusinessException;
import smw.capstone.common.exception.CustomErrorCode;
import smw.capstone.entity.Board;
import smw.capstone.entity.Member;
import smw.capstone.repository.BoardRepository;
import smw.capstone.repository.MemberRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    public void saveBoard(BoardUploadDTO boardUploadDTO /*사용자 정보*/) {

        Member temp = memberRepository.findById(1L); //임시 데이터
        boardRepository.save(Board.builder()
                .content(boardUploadDTO.getContent())
                .title(boardUploadDTO.getBoardTitle())
                .createAt(LocalDate.now())
                .likes(0)
                .member(temp)
                .build());
    }

    public List<BoardDTO> getAllBoard(/*사용자정보*/) {
        Member temp = memberRepository.findById(1L); //임시 데이터
        List<Board> boardList = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "createAt"));
        List<BoardDTO> responseBoardDTO = new ArrayList<>();
        for (Board board : boardList) {
            responseBoardDTO.add(BoardDTO.builder()
                    .boardId(board.getId())
                    .boardTitle(board.getTitle())
                    .createAt(board.getCreateAt())
                    .updateAt(board.getUpdateAt())
                    .memberName(temp.getID()).build());
        }
        return responseBoardDTO;
    }

    public void deleteBoard(Long boardId/*사용자 정보*/) {
        Member temp = memberRepository.findById(1L); //임시 데이터
        //멤버가 작성한 글이 맞으면 게시물 삭제
        System.out.println(boardId);
        Board board = boardRepository.findByMemberAndId(temp, boardId).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_BOARD));

        boardRepository.delete(board);
    }

    public BoardDTO getOneBoard(Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_MEMBER_BOARD));
        return BoardDTO.builder()
                .boardId(board.getId())
                .memberName(board.getMember().getID())
                .updateAt(board.getUpdateAt())
                .boardTitle(board.getTitle())
                .content(board.getContent())
                .createAt(board.getCreateAt()).build();
    }
}
