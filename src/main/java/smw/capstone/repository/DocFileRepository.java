package smw.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import smw.capstone.entity.DocFile;
import smw.capstone.entity.Documents;
import smw.capstone.entity.Files;

import java.util.List;


public interface DocFileRepository extends JpaRepository<DocFile, Long> {
    List<DocFile> findByDocumentId(Long docId);

    List<DocFile> findByDocument(Documents documents);

    DocFile findByFile(Files files);

    public void deleteAllByDocument(Documents documents);

    public void deleteByDocumentAndFile(Documents documents, Files files);
}
