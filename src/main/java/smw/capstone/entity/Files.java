package smw.capstone.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    private String Name;

    private String License;

    private String Category;

    private String Summary;

    private String storedFileName;

}
