package smw.capstone.DTO;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class DocsIdDTO {

    private List<Long> docsIdList;

    public DocsIdDTO() {
        this.docsIdList = new ArrayList<>();
    }
}
