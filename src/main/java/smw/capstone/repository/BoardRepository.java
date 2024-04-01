package smw.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import smw.capstone.entity.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
