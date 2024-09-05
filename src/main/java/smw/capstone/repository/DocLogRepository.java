package smw.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import smw.capstone.entity.DocLog;
import smw.capstone.entity.Documents;

import java.util.List;

public interface DocLogRepository extends JpaRepository<DocLog, Long> {
    public List<DocLog> findByDocumentsId(Documents doc);
}