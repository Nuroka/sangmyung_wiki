package smw.capstone.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Getter
@Builder
@AllArgsConstructor
public class FileUploadDTO {
    @NotBlank
    private String fileName;
    @NotBlank
    private String license;
    @NotBlank
    private String category;
    private String summary;
}
