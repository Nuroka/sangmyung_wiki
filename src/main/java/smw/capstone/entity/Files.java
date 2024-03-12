package smw.capstone.entity;
import jakarta.persistence.*;

@Entity
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

}
