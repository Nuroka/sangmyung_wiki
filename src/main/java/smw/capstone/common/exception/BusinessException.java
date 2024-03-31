package smw.capstone.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BusinessException extends RuntimeException{
    //서버에서 처리할 커스텀 예외 클래스 추가
    CustomErrorCode errorCode;
}
