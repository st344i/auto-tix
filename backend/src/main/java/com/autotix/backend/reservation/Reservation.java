package com.autotix.backend.reservation;

import java.time.Instant;
import com.autotix.backend.event.Event;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false) 
    private Event event;

    private String buyerName;
    private String buyerEmail;
    private String ticketType; 
    private String paymentDetails;   // mock details will be inserted. token/reference only

    @Enumerated(EnumType.STRING)
    private ReservationStatus status;  //for current MVP status will be PENDING 

    private Instant createdAt;

    public Reservation() {
    }

    public Reservation(Event event, String buyerName, String ticketType, String buyerEmail, String paymentDetails) {
        this.event = event;
        this.buyerName = buyerName;
        this.buyerEmail = buyerEmail;
        this.ticketType = ticketType;
        this.paymentDetails = paymentDetails;
        this.status = ReservationStatus.PENDING;
        this.createdAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public String getBuyerName() {
        return buyerName;
    }

    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }

        public String getTicketType() {
        return ticketType;
    }

    public void setTicket(String ticketType) {
        this.ticketType = ticketType;
    }

    public String getBuyerEmail() {
        return buyerEmail;
    }

    public void setBuyerEmail(String buyerEmail) {
        this.buyerEmail = buyerEmail;
    }

    public String getPaymentDetails() {
        return paymentDetails;
    }

    public void setPaymentDetails(String paymentDetails) {
        this.paymentDetails = paymentDetails;
    }

    public ReservationStatus getStatus() {
        return status;
    }

    public void setStatus(ReservationStatus status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}