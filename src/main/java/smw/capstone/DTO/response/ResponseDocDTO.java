package smw.capstone.DTO;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder
@AllArgsConstructor
@Getter
public class ResponseDocDTO {

    private Long id;

    private Long memberId;

    private String title;

    private String content;

    private LocalDate createAt;

    private LocalDate updateAt;

}
