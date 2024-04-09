package smw.capstone.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class SigninCode {
    @Id
    @GeneratedValue
    @Column(name = "Attempted")
    private Long Id;

    private String Email;

    private String Certification_Code;

}
