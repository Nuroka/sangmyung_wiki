package smw.capstone.common.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import smw.capstone.common.util.CustomLogger;

@RestControllerAdvice
public class GlobalExceptionHandler {

    //ErrorResponse 클라이언트에게 반환되는 Response Body 형태
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBaseException(BusinessException e) {
        //CustomeLogger로 내가 설정한 에러 메시지 출력하게..
        CustomLogger.error(e.errorCode.getMessage()); //로그에 에러 메시지 출력
        return ResponseEntity.status(e.errorCode.getStatus()).body(ErrorResponse.of(e.errorCode));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> hadleValidException(MethodArgumentNotValidException e) {
        BindingResult bindingResult = e.getBindingResult();
        StringBuilder builder = new StringBuilder();

        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            builder.append("[");
            builder.append(fieldError.getField());
            builder.append("](은)는 ");
            builder.append(fieldError.getDefaultMessage());
            builder.append(" 입력된 값: [");
            builder.append(fieldError.getRejectedValue());
            builder.append("]");
        }
        CustomLogger.error(builder.toString());
        return ResponseEntity.status(e.getStatusCode()).body(builder.toString());
    }

}
