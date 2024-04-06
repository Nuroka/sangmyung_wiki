package smw.capstone.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum CustomErrorCode{

    //클라이언트에게 보낼 에러코드 정의
    NOT_EXIST_BOARD(HttpStatus.BAD_REQUEST, "게시물이 없습니다."),
    NOT_EXIST_DOC(HttpStatus.BAD_REQUEST, "해당 id를 가진 문서가 없습니다."),
    EMPTY_DOC(HttpStatus.BAD_REQUEST, "문서가 없습니다."),
    NOT_EXIST_KEYWORD_DOC(HttpStatus.BAD_REQUEST, "해당 키워드가 포함된 문서가 없습니다."),
    NOT_EXIST_MEMBER_DOC(HttpStatus.BAD_REQUEST, "사용자가 작성한 문서가 아닙니다."),
    NOT_EXIST_MEMBER_BOARD(HttpStatus.BAD_REQUEST, "해당 게시물이 존재하지 않습니다."),
    NOT_EXIST_FILE(HttpStatus.BAD_REQUEST, "등록할 파일이 없습니다."),
    NOT_EXIST_FILE_BY_ID(HttpStatus.BAD_REQUEST, "해당 id를 가진 파일이 없습니다."),
    NOT_EXIST_KEYWORD(HttpStatus.BAD_REQUEST, "한 문자 이상의 키워드를 입력해주세요"),
    NOT_EXIST_DOC_ID(HttpStatus.BAD_REQUEST, "문서 id를 입력해주세요."),


    NOT_EXIST_MEMBER(HttpStatus.BAD_REQUEST, "존재하지 않는 회원입니다."),
    NOT_MATCHED_CODE(HttpStatus.BAD_REQUEST, "인증번호가 틀렸습니다."),
    NOT_LOGIN(HttpStatus.BAD_REQUEST, "로그인정보가 틀렸습니다.")
    ;

    private final HttpStatus status;
    private final String message;
}
