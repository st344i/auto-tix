package com.autotix.backend.event;

import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events") //events from the event.java (table= events)
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<Event> getEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable Long id) {
        return eventService.getEvent(id);
    }
}