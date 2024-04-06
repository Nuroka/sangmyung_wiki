package smw.capstone.DTO.response;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class DocsIdDTO {

    @NotNull
    @Size(min = 1)
    private List<Long> docsIdList;

    public DocsIdDTO() {
        this.docsIdList = new ArrayList<>();
    }
}
