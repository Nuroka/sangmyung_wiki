package smw.capstone.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate // 변경한 필드만 대응
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

    public void updateDoc(String content, LocalDate updateAt) {
        this.content = content;
        this.updateAt = updateAt;
    }

}
