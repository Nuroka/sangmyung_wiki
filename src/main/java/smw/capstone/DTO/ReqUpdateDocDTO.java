package smw.capstone.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReqUpdateDocDTO {

    @JsonProperty("doc_id")
    private Long docId;
    private String content;
    @JsonProperty("file_name")
    private List<String> fileName;
}
