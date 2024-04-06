package smw.capstone.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class LoginDTO {
    @NotNull
    private String Username;
    @NotNull
    private String Password;
}
