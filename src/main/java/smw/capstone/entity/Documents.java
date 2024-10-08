package smw.capstone.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String content;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    @OneToMany(mappedBy = "document", orphanRemoval = true)
    private List<DocFile> docFileList = new ArrayList<DocFile>();

    public void updateDoc(String content, LocalDateTime updateAt, Files filesId) {
        this.content = content;
        this.updateAt = updateAt;
        this.filesId = filesId;
    }

    @OneToOne
    @JoinColumn(name="files_id")
    private Files filesId;

}
