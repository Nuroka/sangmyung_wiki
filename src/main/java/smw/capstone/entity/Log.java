package smw.capstone.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
public class Log {
    @Id
    @GeneratedValue
    private Long Id;

    @ManyToOne
    @JoinColumn(name = "Member_Id", nullable = false)
    private Member member;

    private String type;

    private Timestamp timestamp;


}
