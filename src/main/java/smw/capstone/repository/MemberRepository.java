package smw.capstone.repository;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import smw.capstone.common.exception.BusinessException;
import smw.capstone.common.exception.CustomErrorCode;
import smw.capstone.entity.Member;
import smw.capstone.entity.SigninCode;

@Repository
@RequiredArgsConstructor
public class MemberRepository {

    @Autowired
    private final EntityManager em;

    @Transactional
    public void save(Member member) {
        em.persist(member);
    }

    public Member findById(Long id) {
        return em.find(Member.class, id);
    }


    public void remove(Member member){em.remove(em.contains(member) ? member : em.merge(member));}

    public Member findByUsername(String username){
        Member m = em.createQuery("select m from Member m where m.Username=:username", Member.class).setParameter("username", username).getSingleResult();
        if (m == null){
            throw new BusinessException(CustomErrorCode.NOT_EXIST_MEMBER);
        }else {
            return m;
        }
    }

    public Member update(Member member){
        em.merge(member);

        return member;
    }

    @Transactional
    public void certificate_process(SigninCode signinCode){
        em.persist(signinCode);

    }

    public String findCode(String email) {
        SigninCode signinCode = em.createQuery("select s from SigninCode s where s.Email=:email", SigninCode.class).setParameter("email", email).getSingleResult();

        return signinCode.getCertification_Code();
    }
}
