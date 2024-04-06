package smw.capstone.DTO.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BoarUpdatedDTO {

    @JsonProperty("board_id")
    @NotNull
    private Long boardId;
    @NotNull
    private String content;
    
}
