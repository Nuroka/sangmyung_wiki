package smw.capstone.DTO.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import smw.capstone.DTO.FileUploadDTO;
import smw.capstone.DTO.response.ResponseFilePathDTO;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@AllArgsConstructor
@Builder
@Getter
@NoArgsConstructor
public class FileDTO {
    private FileUploadDTO fileUploadDTO;
    private ResponseFilePathDTO responseFilePathDTO;

}
