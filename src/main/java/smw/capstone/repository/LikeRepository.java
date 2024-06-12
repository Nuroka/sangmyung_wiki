package smw.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import smw.capstone.entity.Board;
import smw.capstone.entity.Like;
import smw.capstone.entity.Member;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {

    public Like findByMemberAndBoard(Member member, Board board);
    public List<Like> findByBoard(Board board);
}
