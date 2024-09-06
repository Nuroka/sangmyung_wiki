package smw.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import smw.capstone.entity.Documents;
import smw.capstone.entity.Files;
import smw.capstone.entity.Member;

import java.util.List;
import java.util.Optional;

public interface DocRepository extends JpaRepository<Documents, Long> {

    @Query("select doc from Documents doc where doc.title like concat('%', :keyword, '%')")
    public List<Documents> findByKeyword(@Param("keyword") String keyword);

    public List<Documents> findByMember(Member member);

    public Optional<Documents> findByIdAndMember(Long id, Member member);

    public Documents findByTitle(String title);

    public List<Documents> findByFilesId(Files filesId);

}
