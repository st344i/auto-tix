package com.autotix.backend.preauth;

import java.time.Instant;
import com.autotix.backend.event.Event;
import com.autotix.backend.ticket.Ticket;
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
@Table(name = "pre_auths")
public class PreAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;

    private String buyerName;
    private String buyerEmail;
    private String paymentReference;   // token/reference only — never store raw card details

    @Enumerated(EnumType.STRING)
    private PreAuthStatus status;      // PENDING for MVP; CONFIRMED/EXPIRED/RELEASED belong to the on-sale engine

    private Instant createdAt;

    public PreAuth() {
    }

    public PreAuth(Event event, Ticket ticket, String buyerName, String buyerEmail, String paymentReference) {
        this.event = event;
        this.ticket = ticket;
        this.buyerName = buyerName;
        this.buyerEmail = buyerEmail;
        this.paymentReference = paymentReference;
        this.status = PreAuthStatus.PENDING;
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

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public String getBuyerName() {
        return buyerName;
    }

    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }

    public String getBuyerEmail() {
        return buyerEmail;
    }

    public void setBuyerEmail(String buyerEmail) {
        this.buyerEmail = buyerEmail;
    }

    public String getPaymentReference() {
        return paymentReference;
    }

    public void setPaymentReference(String paymentReference) {
        this.paymentReference = paymentReference;
    }

    public PreAuthStatus getStatus() {
        return status;
    }

    public void setStatus(PreAuthStatus status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}