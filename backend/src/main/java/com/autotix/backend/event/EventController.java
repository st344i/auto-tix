package com.autotix.backend.event;

import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events") //events from the event.java (table= events)
@CrossOrigin(origins = "http://localhost:5173") // ??
public class EventController {
    private final EventService eventService;
// Controller is received from Service
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }



/* information gets requested from the Controller, and the Controller responds
the browser sends the GET /api/events request, triggered by the React useEffect. 
Your EventController sits and waits for that request to arrive, then hands back whatever eventService.getAllEvents() gives it. 
 */ 
    @GetMapping
    public List<Event> getEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable Long id) {
        return eventService.getEvent(id);
    }
}

/* GET /api/events request arrives → Spring sees @GetMapping (with the class-level @RequestMapping("/api/events")) 
and knows to run getEvents() 
getEvents() runs → its only job is to call eventService.getAllEvents() 
GET /api/events (no id) = "give me the list for the browse page." 
GET /api/events/3 (with id) = "give me the full detail for the one the user selected."*/