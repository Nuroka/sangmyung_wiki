package smw.capstone.DTO.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class ReqCreateDoc {
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    @JsonProperty("file_name")
    private List<String> fileName;
}
