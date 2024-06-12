package smw.capstone.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LikeDTO {

    private boolean isLike;
    private int count;
}
