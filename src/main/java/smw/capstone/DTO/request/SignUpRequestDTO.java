package smw.capstone.DTO.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequestDTO {

    @NotBlank @jakarta.validation.constraints.Email
    private String Email;

    @NotBlank
    private String Username;

    @NotBlank @Size(min=8, max=20)
    private String Password;

    private int Student_Id;

    private String Admin_Type;
}
