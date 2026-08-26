package com.autotix.backend.ticket;

import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public List<Ticket> getTickets(@RequestParam Long eventId) {
        return ticketService.getTicketsByEvent(eventId);
    }                                                       /*@RequestParam Long eventId means the frontend calls GET /api/tickets?eventId=3 — difference between @PathVariable vs @RequestParam is
                                                                path variables identify one resource and query params filter a collection. */ 

    @GetMapping("/{id}")
    public Ticket getTicket(@PathVariable Long id) {
        return ticketService.getTicket(id);
    }
}