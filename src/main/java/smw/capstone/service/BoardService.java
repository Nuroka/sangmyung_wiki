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
import smw.capstone.entity.Member;
import smw.capstone.repository.BoardRepository;
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

    @Transactional
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
                    .memberName(temp.getUsername()).build());
        }
        return responseBoardDTO;
    }

    @Transactional
    public void deleteBoard(Long boardId/*사용자 정보*/) {
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
                .createAt(board.getCreateAt()).build();
    }

    @Transactional
    public void updateBoard(BoarUpdatedDTO updateBoardDTO) {
        Member temp = memberRepository.findByUsername("test");
        Board findBoard = boardRepository.findByMemberAndId(temp, updateBoardDTO.getBoardId()).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_MEMBER_BOARD));
        findBoard.updateBoard(updateBoardDTO.getContent());
    }
}
