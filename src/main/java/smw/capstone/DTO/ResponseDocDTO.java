package smw.capstone.DTO;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import smw.capstone.entity.Member;

import java.time.LocalDate;

@Builder
@AllArgsConstructor
public class ResponseDocDTO {

    private Long id;

    private Long memberId;

    private String title;

    private String content;

    private LocalDate createAt;

    private LocalDate updateAt;

}
