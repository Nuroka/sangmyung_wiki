package smw.capstone.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ResponseFilePathDTO {
    @JsonProperty("file_url")
    private String fileUrl;
}
