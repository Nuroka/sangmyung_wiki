package smw.capstone.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UpdateBoardDTO {

    @JsonProperty("board_id")
    private String boardId;
    private String content;
}
