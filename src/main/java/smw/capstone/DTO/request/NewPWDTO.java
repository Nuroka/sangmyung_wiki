package smw.capstone.DTO.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NewPWDTO {
    @NotBlank
    @Email
    @JsonProperty("newpw")
    private String pw;

    @NotBlank @JsonProperty("newpw2")
    private String pw2;
}
