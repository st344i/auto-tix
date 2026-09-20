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

    private String buyerFirstname;
    private String buyerLastname;
    private String buyerEmail;
    private String ticketType; 
    private String cardNumber;
    private String cardCvc;
    private String cardExpiry;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status;  //for current MVP status will be PENDING 

    private Instant createdAt;

    public Reservation() {
    }

    public Reservation(Event event, String buyerFirstname, String buyerLastname, String ticketType, String buyerEmail, String cardNumber, String cardCvc, String cardExpiry ) {
        this.event = event;
        this.buyerFirstname = buyerFirstname;
        this.buyerLastname = buyerLastname;
        this.buyerEmail = buyerEmail;
        this.ticketType = ticketType;
        this.cardNumber = cardNumber; 
        this.cardCvc = cardCvc;
        this.cardExpiry = cardExpiry;
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

    public String getbuyerFirstname() {
        return buyerFirstname;
    }

    public void setbuyerFirstname(String buyerFirstname) {
        this.buyerFirstname = buyerFirstname;
    }

        public String getbuyerLastname() {
        return buyerLastname;
    }

    public void setbuyerLastname(String buyerLastname) {
        this.buyerLastname = buyerLastname;
    }

        public String getTicketType() {
        return ticketType;
    }

    public void setTicketType(String ticketType) {
        this.ticketType = ticketType;
    }

    public String getBuyerEmail() {
        return buyerEmail;
    }

    public void setBuyerEmail(String buyerEmail) {
        this.buyerEmail = buyerEmail;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public String getCardCvc() {
        return cardCvc;
    }

    public void setCardCvc(String cardCvc) {
        this.cardCvc = cardCvc;
    }

    public String getCardExpiry() {
        return cardExpiry;
    }

    public void setCardExpiry(String cardExpiry) {
        this.cardExpiry = cardExpiry;
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