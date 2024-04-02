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

    public void remove(Member member) {
        em.remove(em.contains(member) ? member : em.merge(member));
    }

    public Member findByID(String username){
        return em.createQuery("select m from Member m where m.Username=:username", Member.class).setParameter("username", username).getSingleResult();
    }

    @Transactional
    public void update(Member member) {
        em.merge(member);
    }
}
