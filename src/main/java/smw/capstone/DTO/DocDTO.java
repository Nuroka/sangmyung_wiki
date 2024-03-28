package smw.capstone.DTO;

import lombok.Getter;
import lombok.Setter;
import smw.capstone.entity.Documents;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class DocDTO {
    private ResponseDocDTO documents;
    private List<FileDTO> fileDtoList;

    public DocDTO() {
        this.fileDtoList = new ArrayList<>();
    }

    public void addFileDto(FileDTO fileDTO) {
        fileDtoList.add(fileDTO);
    }


}
