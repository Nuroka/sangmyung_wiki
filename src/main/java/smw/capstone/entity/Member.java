package smw.capstone.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Member {
    @Id
    @GeneratedValue
    @Column(name = "Member_Id")
    private Long Id;
    private String Email;
    private String Username;
    private String Password;
    private int Student_Id;
    @Enumerated(EnumType.STRING)
    private Type type;
//
//    public void setID(String id){
//    ID = id;
//    }
//
//    public String getID() {
//        return this.ID;
//    }
//
//    public Long getId() {
//        return this.getId();
//    }
}

