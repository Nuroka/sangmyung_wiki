package smw.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import smw.capstone.entity.Board;
import smw.capstone.entity.Member;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {

    Optional<Board> findByMemberAndId(Member member, Long boardId);
}
