package smw.capstone.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;


@Entity
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Getter
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Board_Id")
    private Long Id;

    @JoinColumn(name = "Member_Id", nullable = false)
    @ManyToOne
    private Member member;

    private String title;

    @ColumnDefault("0")
    private int likes;
    private LocalDate createAt;

    private LocalDate updateAt;

    private String content;

    public void updateBoard(String content) {
        this.content = content;
    }
    public void updateLike(int like) {
        this.likes = like;
    }

}
