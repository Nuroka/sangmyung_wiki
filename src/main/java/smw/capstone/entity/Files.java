package smw.capstone.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Files {
    @Id
    @GeneratedValue
    private Long Id;
    @ManyToOne
    @JoinColumn(name = "Member_Id", nullable = false)
    private Member member;

    private String name;

    private String License;

    private String Category;

    private String Summary;

    private String storedFileName;


    @OneToMany(mappedBy = "file", orphanRemoval = true)
    private List<DocFile> docFileList = new ArrayList<DocFile>();
}
