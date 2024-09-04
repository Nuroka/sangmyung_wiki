package smw.capstone.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="docLogId")
    private Long id;

    @JoinColumn(name = "documents_id", nullable = false)
    @ManyToOne
    private Documents documentsId;

    //등록된 시간
    private LocalDateTime timestamp;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String log;

    //문서 업로드할 때 사진이 한개밖에 안올라감 -> 다대다인줄 알았는데 아님
    @JoinColumn(name="file_id")
    @ManyToOne
    private Files files;

}
