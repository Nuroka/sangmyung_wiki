package smw.capstone.DTO.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class SignUpResponseDTO {

    public static ResponseEntity<SignUpResponseDTO> success(){
        SignUpResponseDTO result = new SignUpResponseDTO();

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}
