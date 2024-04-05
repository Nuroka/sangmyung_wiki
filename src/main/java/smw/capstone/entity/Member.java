package smw.capstone.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
    private String ID;
    private String Password;
    private int Student_Id;
    private String Admin_Type;

    public void setID(String id){
    ID = id;
    }

    public String getID() {
        return this.ID;
    }

    public Long getId() {
        return this.getId();
    }
}

