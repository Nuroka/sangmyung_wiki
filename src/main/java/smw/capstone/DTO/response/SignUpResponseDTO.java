package smw.capstone.DTO.response;

import lombok.Getter;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import smw.capstone.common.ResponseCode;
import smw.capstone.common.ResponseMessage;

@Getter
public class SignUpResponseDTO extends ResponseDTO{

    private SignUpResponseDTO(){
        super(ResponseCode.SIGN_UP_SUCCESS, ResponseMessage.SIGN_UP_SUCCESS);

    }

    public static ResponseEntity<SignUpResponseDTO> success(){
        SignUpResponseDTO result = new SignUpResponseDTO();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDTO> duplicateEmail(){
        ResponseDTO result = new ResponseDTO(ResponseCode.SIGN_UP_FAILED, ResponseMessage.SIGN_UP_FAILED);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    public static ResponseEntity<ResponseDTO> noInformation(){
        ResponseDTO result = new ResponseDTO(ResponseCode.NOT_ENOUGH_INFORMATION, ResponseMessage.NOT_ENOUGH_INFORMATION);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
}
