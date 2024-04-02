package smw.capstone.repository;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import smw.capstone.entity.Board;

@Repository
@RequiredArgsConstructor
public class BoardRepository {

    private final EntityManager em;
    @Transactional
    public void save(Board board){
        em.persist(board);
    }

    @Transactional
    public void delete(Long id){
        Board board = em.find(Board.class, id);
        if (board != null) {
            em.remove(board);
        }
    }
}
