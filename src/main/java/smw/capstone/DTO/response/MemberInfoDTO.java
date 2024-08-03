package smw.capstone.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class MemberInfoDTO {
    private String username;
    private String email;
}
