package smw.capstone.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@Getter
@NoArgsConstructor
public class FileDTO {
    private FileUploadDTO fileUploadDTO;
    private  ResponseFilePathDTO responseFilePathDTO;

}
