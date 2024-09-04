package smw.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import smw.capstone.entity.DocLog;

public interface DocLogRepository extends JpaRepository<DocLog, Long> {

}