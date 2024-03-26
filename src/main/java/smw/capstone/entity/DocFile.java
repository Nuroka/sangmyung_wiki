package smw.capstone.entity;

import jakarta.persistence.*;

//@Entity
public class DocFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "Id")
    @ManyToOne
    private Documents document;

    @JoinColumn(name = "Id")
    @ManyToOne
    private Files file;
}
