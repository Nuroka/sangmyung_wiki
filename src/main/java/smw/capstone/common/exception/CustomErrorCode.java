package smw.capstone.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum CustomErrorCode{

    //클라이언트에게 보낼 에러코드 정의
    TEST(HttpStatus.BAD_REQUEST, "커스텀 에러 테스트"),
    ;

    private final HttpStatus status;
    private final String message;
}
