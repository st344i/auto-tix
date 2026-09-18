package com.autotix.backend.exception;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
// "tells Spring: watch EVERY controller in this app; if any of them
//  let an exception escape, send it here instead of crashing"
public class GlobalExceptionHandler {

    @ExceptionHandler(EventNotFoundException.class)
    // "specifically: if an EventNotFoundException shows up anywhere, run this method"
    public ResponseEntity<ErrorResponse> handleEventNotFound(
            EventNotFoundException e, HttpServletRequest request) {
        // "e = the actual exception object that was thrown, so we can read its message"
        // "request = info about the HTTP call that caused this, so we can log the path"

        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),      // "404, as a plain number"
            "Not Found",                        // "short label for the error type"
            e.getMessage(),                     // "the exact message we wrote when throwing it"
            request.getRequestURI()             // "which endpoint was called, e.g. /api/reservations"
        );

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
        // "send this ErrorResponse back as JSON, with HTTP status 404 attached"
    }
}