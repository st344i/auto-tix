package com.autotix.backend.event;

import java.util.List;
import org.springframework.stereotype.Service;

import com.autotix.backend.exception.EventNotFoundException;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEvent(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException("Event not found: " + id)); //find ID, else if not found throw no such element exception ("Event not found").  
    }
}