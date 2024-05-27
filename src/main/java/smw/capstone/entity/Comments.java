package smw.capstone.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Comments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Comments_Id")
    private Long Id;

    @JoinColumn(name = "Member_Id", nullable = false)
    @ManyToOne
    private Member member;

    @JoinColumn(name = "Board_Id")
    @ManyToOne
    private Board board;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    public void updateContent(String content) {
        this.content = content;
    }
}
