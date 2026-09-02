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

    private String name;
    private String venue;
    private String location;
    private Instant eventDate;
    private Integer ticketsRemaining; // "Integer"  -JPA entities need wrapper/object types (not primitives) for fields that can be null or managed by Hibernate.

    public Event() {
    }

    public Event(String name, String venue, String location, Instant eventDate, Integer ticketsRemaining) {
        this.name = name;
        this.venue = venue;
        this.location = location;
        this.eventDate = eventDate;
        this.ticketsRemaining = ticketsRemaining;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public Instant getEventDate() {
        return eventDate;
    }

     public void setLocation(String location) {
    this.location = location;
    }

    public String getLocation() {
    return location;
    }

    public void setEventDate(Instant eventDate) {
        this.eventDate = eventDate;
    }

    public void setTicketsRemaining(Integer ticketsRemaining) {
        this.ticketsRemaining = ticketsRemaining;
    }

    public Integer getTicketsRemaining() {
        return ticketsRemaining;
    }
}



