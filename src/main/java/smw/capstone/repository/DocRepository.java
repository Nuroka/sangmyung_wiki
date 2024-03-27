package smw.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import smw.capstone.entity.Documents;

import java.util.List;
import java.util.Optional;

public interface DocRepository extends JpaRepository<Documents, Long> {

    @Query("select doc from Documents doc where doc.title like concat('%', :keyword, '%')")
    public List<Documents> findByKeyword(@Param("keyword") String keyword);

}
