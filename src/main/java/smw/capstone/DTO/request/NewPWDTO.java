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
    @JsonProperty("pw")
    private String pw;

    @NotBlank
    @JsonProperty("pw2")
    private String pw2;

    @NotBlank
    private String uuid;
}
