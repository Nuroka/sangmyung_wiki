package smw.capstone.repository;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import smw.capstone.entity.Member;

@Repository
@RequiredArgsConstructor
public class MemberRepository {

    @Autowired
    private final EntityManager em;

    @Transactional
    public void save(Member member) { em.persist(member);}

    public Member findById(Long id) {
        return em.find(Member.class, id);
    }
}
