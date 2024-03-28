package smw.capstone.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class DocFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "dcouments_id")
    private Documents document;

    @ManyToOne
    @JoinColumn(name = "file_id")
    private Files file;
}
