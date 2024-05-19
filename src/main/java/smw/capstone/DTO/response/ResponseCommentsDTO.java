package smw.capstone.DTO.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import smw.capstone.service.BoardService;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ResponseCommentsDTO {

    private Long commentId;
    private String memberName;
    private String content;
    private LocalDate createAt;
    private LocalDate updateAt;

    public ResponseCommentsDTO setMemberName(String username) {
        this.memberName = username;
        return this;
    }

}
