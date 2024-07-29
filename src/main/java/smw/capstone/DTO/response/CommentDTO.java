package smw.capstone.DTO.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@AllArgsConstructor
@Getter
@NoArgsConstructor
public class CommentDTO {
    private ResponseCommentsDTO parent;
    private List<ResponseCommentsDTO> child = new ArrayList<ResponseCommentsDTO>();

    public void setParent(ResponseCommentsDTO parent) {
        this.parent = parent;
    }

    public void setChild(List<ResponseCommentsDTO> child) {
        this.child = child;
    }
}
