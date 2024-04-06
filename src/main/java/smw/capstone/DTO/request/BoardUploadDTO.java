package smw.capstone.DTO.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.GeneratedValue;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class BoardUploadDTO {

    @JsonProperty("board_title")
    @NotBlank
    private String boardTitle;
    @NotBlank
    private String content;
}
