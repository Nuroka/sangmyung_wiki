package smw.capstone.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FileUploadDTO {
    @JsonProperty("file_name")
    private String fileName;
    private String license;
    private String category;
    private String summary;
}
