package smw.capstone.DTO.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class BoardDTO {

    private Long boardId;
    private String boardTitle;
    private String memberName;
    private Long memberId;
    private LocalDateTime updateAt;
    private LocalDateTime createAt;
    private  String content;
    private int likeCount;
    private int commentsCount;
    private boolean isLike;
}
