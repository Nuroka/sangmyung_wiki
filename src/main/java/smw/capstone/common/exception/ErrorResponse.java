package smw.capstone.common.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.validation.FieldError;

import java.util.List;

@Getter
@RequiredArgsConstructor
@Builder
public class ErrorResponse {

    private final int status;
    private final String message;

    public static ErrorResponse of(CustomErrorCode errorCode) {
        return ErrorResponse.builder()
                .message(errorCode.getMessage())
                .status(errorCode.getStatus().value()).build();
    }

}
