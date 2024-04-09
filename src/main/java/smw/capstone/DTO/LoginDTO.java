package smw.capstone.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class LoginDTO {
    @NotNull
    @JsonProperty("username")
    private String Username;

    @NotNull
    @JsonProperty("password")
    private String Password;
}
