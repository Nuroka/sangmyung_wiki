package smw.capstone.common.util;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomLogger {

    public static void error(String message) {
        log.error(message);
    }

    public static void info(String message) {
        log.info(message);
    }

    public static void trace(String message) {
        log.trace(message);
    }
}
