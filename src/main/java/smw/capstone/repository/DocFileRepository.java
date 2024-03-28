package smw.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import smw.capstone.entity.DocFile;
import smw.capstone.entity.Documents;

import java.util.List;


public interface DocFileRepository extends JpaRepository<DocFile, Long> {

    @Query("select df from DocFile df where df.document = :docId")
    List<DocFile> findByDocumentId(@Param("docId") Long docId);

    List<DocFile> findByDocument(Documents documents);
}
