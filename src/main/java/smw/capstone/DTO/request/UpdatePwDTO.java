package smw.capstone.DTO.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdatePwDTO {
    @NotBlank
    @JsonProperty("password")
    private String pw;

    @NotBlank
    @JsonProperty("new_password")
    private String pw2;
}
