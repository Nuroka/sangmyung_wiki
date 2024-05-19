package smw.capstone.DTO.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ReqUpdateCommentDTO {
    @JsonProperty("comment_id")
    private Long commentId;
    private String content;
}
