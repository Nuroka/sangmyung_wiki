package smw.capstone.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Getter
@Builder
public class MemberInfoDTO {
    private String username;
    private String email;
    private List<String> filelist = new ArrayList<>();
}
