package smw.capstone.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import smw.capstone.common.exception.BusinessException;
import smw.capstone.common.exception.CustomErrorCode;
import smw.capstone.entity.Emailcertificatelog;
import smw.capstone.entity.Member;
import smw.capstone.entity.SigninCode;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MemberRepository {

    @Autowired
    private final EntityManager em;

    @Transactional
    public void save(Member member) {
        em.persist(member);
    }

    @Transactional
    public void saveEmaillog(Emailcertificatelog log) { em.persist(log);}

    public Member findById(Long id) {
        return em.find(Member.class, id);
    }


    public void remove(Member member){em.remove(em.contains(member) ? member : em.merge(member));}

    @Transactional
    public void removeSigninCode(SigninCode signinCode){em.remove(em.contains(signinCode) ? signinCode : em.merge(signinCode));}

    public Member findByUsername(String username) {
        try {
            return em.createQuery("select m from Member m where m.Username=:username", Member.class)
                    .setParameter("username", username)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
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
        try {
            return em.createQuery("select s from SigninCode s where s.Email=:email", SigninCode.class)
                    .setParameter("email", email)
                    .getSingleResult()
                    .getCertification_Code();
        } catch (NoResultException e) {
            return null;
        }
    }

    public SigninCode findsignincode(String code){
        return em.createQuery("select s from SigninCode s where s.Certification_Code=:code", SigninCode.class).setParameter("code", code).getSingleResult();
    }

    public Member findMemberByEmail(String email) {
        return em.createQuery("select m from Member m where m.Email=:email", Member.class).setParameter("email", email).getSingleResult();
    }
}
