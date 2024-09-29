package smw.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import smw.capstone.entity.Files;
import smw.capstone.entity.Member;

import java.util.List;
import java.util.Optional;

public interface FileRepository extends JpaRepository<Files, Long> {

    @Query("select f from Files f where f.name = :name and f.member = :member")
    public Files findByMemberAndName(Member member, String name);

    List<Files> findByMember(Member member);

    Files findByName(String name);
}
