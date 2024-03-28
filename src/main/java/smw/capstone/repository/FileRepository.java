package smw.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import smw.capstone.entity.Files;

public interface FileRepository extends JpaRepository<Files, Long> {
}
