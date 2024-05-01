package smw.capstone.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
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
    private Board boad;

    private String content;

    private LocalDate createAt;

    private LocalDate updateAt;
}
