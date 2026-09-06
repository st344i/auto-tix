package com.autotix.backend.event;


import java.time.Instant;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventName;
    private String venueLocation;
    private Instant eventDate;
    private Float price;
    private Integer ticketsRemaining; // "Integer"  -JPA entities need wrapper/object types (not primitives) for fields that can be null or managed by Hibernate.

    public Event() {
    }

    public Event(String eventName, String venueLocation, Instant eventDate, Float price, Integer ticketsRemaining) {
        this.eventName = eventName;
        this.venueLocation = venueLocation;
        this.eventDate = eventDate;
        this.price = price;
        this.ticketsRemaining = ticketsRemaining;
    }

    public Long getId() {
        return id;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getVenueLocation() {
        return venueLocation;
    }

    public void setVenueLocation(String venueLocation) {
        this.venueLocation = venueLocation;
    }

    public Instant getEventDate() {
        return eventDate;
    }

    public void setEventDate(Instant eventDate) {
        this.eventDate = eventDate;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Float getPrice() {
        return price;
    }

    public void setTicketsRemaining(Integer ticketsRemaining) {
        this.ticketsRemaining = ticketsRemaining;
    }

    public Integer getTicketsRemaining() {
        return ticketsRemaining;
    }
}



