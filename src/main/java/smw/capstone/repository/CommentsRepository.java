package smw.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import smw.capstone.entity.Board;
import smw.capstone.entity.Comments;

import java.util.List;
import java.util.Optional;

public interface CommentsRepository extends JpaRepository<Comments, Long> {

    public List<Comments> findByBoard(Board board);

    public List<Comments> findByParent(Comments parent);

}
