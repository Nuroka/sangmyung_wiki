package smw.capstone.common;

public interface ResponseMessage {
    String SIGN_UP_SUCCESS = "Success.";
    String SIGN_IN_SUCCESS = "Authorized.";

    //HTTP status 400
    String SIGN_UP_FAILED = "Existed Email.";
    String SIGN_IN_FAILED = "Unauthorized.";
    String NOT_ENOUGH_INFORMATION = "Not enough information.";

    String DATABASE_ERROR = "Database Error occurred.";

    String MAIL_FAIL = "Mail send failed.";
}
