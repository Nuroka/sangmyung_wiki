package smw.capstone.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Documents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Dcouments_Id;

    @JoinColumn(name = "Member_Id", nullable = false)
    @ManyToOne
    private Member member;

    private String title;

    private String content;

    private LocalDate createAt;

    private LocalDate updateAt;

}
