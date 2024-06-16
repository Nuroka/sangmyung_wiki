package smw.capstone.DTO.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import smw.capstone.service.BoardService;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ResponseCommentsDTO {

    private Long commentId;
    private String memberName;
    private Long memberId;
    private String content;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    public ResponseCommentsDTO setMemberName(String username) {
        this.memberName = username;
        return this;
    }

}
