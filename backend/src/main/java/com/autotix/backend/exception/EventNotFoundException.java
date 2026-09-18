package com.autotix.backend.exception;
// "this file belongs to the exception package/folder"

public class EventNotFoundException extends RuntimeException {
    // "create a new class called EventNotFoundException,
    //  and make it a type of RuntimeException (unchecked)"

    public EventNotFoundException(String message) {
        // "when someone creates this exception, they must give it a message"
        super(message);
        // "pass that message up to RuntimeException, so getMessage() works later"
    }
}