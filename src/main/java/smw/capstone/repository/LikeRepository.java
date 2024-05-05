package smw.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import smw.capstone.entity.Board;
import smw.capstone.entity.Like;
import smw.capstone.entity.Member;

public interface LikeRepository extends JpaRepository<Like, Long> {

    public Like findByMemberAndBoard(Member member, Board board);
}
