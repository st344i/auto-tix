package com.autotix.backend.ticket;

import java.util.List;
import org.springframework.data.repository.ListCrudRepository;

public interface TicketRepository extends ListCrudRepository<Ticket, Long> {
    List<Ticket> findByEventId(Long eventId);
}