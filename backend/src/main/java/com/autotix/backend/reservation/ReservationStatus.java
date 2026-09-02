package com.autotix.backend.reservation;

public enum ReservationStatus {
    PENDING,
    CANCELLED
    // future: CONFIRMED, EXPIRED, RELEASED — handled by the on-sale engine (not yet built)
}