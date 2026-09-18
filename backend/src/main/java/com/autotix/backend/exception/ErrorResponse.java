//this file is the shape of the curated JSON reply
package com.autotix.backend.exception;
import java.time.LocalDateTime;
// "bring in Java's built-in date/time tool so we can timestamp the error"

public class ErrorResponse {
    // "this class defines what an error response LOOKS LIKE when sent as JSON"

    private LocalDateTime timestamp;  // when the error happened
    private int status;               // HTTP status code, e.g. 404
    private String error;             // short label, e.g. "Not Found"
    private String message;           // human-readable detail
    private String path;              // which endpoint was hit

    public ErrorResponse(int status, String error, String message, String path) {
        // "when this object is created, fill in all its fields"
        this.timestamp = LocalDateTime.now(); // "set timestamp to right now"
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }

    // getters — Spring needs these to convert the object into JSON automatically
    public LocalDateTime getTimestamp() { return timestamp; }
    public int getStatus() { return status; }
    public String getError() { return error; }
    public String getMessage() { return message; }
    public String getPath() { return path; }
}