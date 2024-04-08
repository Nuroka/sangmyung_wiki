package smw.capstone.common;

public interface ResponseCode {

    //HTTP status 200
    String SIGN_UP_SUCCESS = "SUS";
    String SIGN_IN_SUCCESS = "SIS";

    //HTTP status 400
    String SIGN_UP_FAILED = "SUF";
    String SIGN_IN_FAILED = "SIF";
    String NOT_ENOUGH_INFORMATION = "NEI";

    String DATABASE_ERROR = "DBE";

    String MAIL_FAIL = "MF";
}
