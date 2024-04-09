package smw.capstone.DTO.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class EmailDTO {
    @NotBlank @Email @JsonProperty("email")
    private String email;

    @NotBlank @JsonProperty("code")
    private String code;
}
