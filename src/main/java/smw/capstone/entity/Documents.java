package smw.capstone.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Documents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Dcouments_Id")
    private Long Id;

    @JoinColumn(name = "Member_Id", nullable = false)
    @ManyToOne
    private Member member;

    private String title;

    private String content;

    private LocalDate createAt;

    private LocalDate updateAt;

    @OneToMany(mappedBy = "document", orphanRemoval = true)
    private List<DocFile> docFileList = new ArrayList<DocFile>();

}
