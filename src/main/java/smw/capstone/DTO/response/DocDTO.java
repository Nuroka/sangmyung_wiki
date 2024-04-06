package smw.capstone.DTO;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import smw.capstone.DTO.response.ResponseDocDTO;

import java.util.ArrayList;
import java.util.List;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Getter
@Setter
@Builder
@AllArgsConstructor
public class DocDTO {
    private String memberUsername;
    private ResponseDocDTO documents;
    private List<FileDTO> fileDtoList;

    public DocDTO() {
        this.fileDtoList = new ArrayList<>();
    }

    public void addFileDto(FileDTO fileDTO) {
        fileDtoList.add(fileDTO);
    }


}
