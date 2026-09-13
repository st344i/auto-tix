package com.autotix.backend.reservation;

 
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.stereotype.Service;
import com.autotix.backend.event.Event;
import com.autotix.backend.event.EventRepository;

@Service
public class ReservationService {
    private final EventRepository eventRepository;
    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository, EventRepository eventRepository) {
        this.reservationRepository = reservationRepository;
        this.eventRepository = eventRepository;
    }

      public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public List<Reservation> getReservationsByEmail(String buyerEmail) {
    return reservationRepository.findByBuyerEmail(buyerEmail);
}
                                                    //***CREATE***

/* Reservation needs a foreign key (event) that must actually exist
A status field that should always start PENDING, regardless of what the client sends */
public Reservation createReservation(Reservation reservation) {
    Event event = eventRepository.findById(reservation.getEvent().getId()).orElseThrow(); //find ID, else if not found throw no such element exception ("Event not found").
    reservation.setEvent(event);
    reservation.setStatus(ReservationStatus.PENDING); // ← This is where a brand new reservation is created, forcing its starting PENDING state
    return reservationRepository.save(reservation);

}

                                                    //***READ-ONLY***

public Reservation getReservation(Long id) {
    return reservationRepository.findById(id).orElseThrow();                                                    
}    
                                                    //***UPDATE***

// Step 1: Go fetch the REAL row from the database using the id in the URL.
    // We never trust that "updatedReservation" (the incoming request body) is the full truth —
    // it might be missing fields, or contain fields the client shouldn't be able to change.
public Reservation updateReservation(Long id, Reservation updatedReservation) {
    Reservation existing = getReservation(id);

    // Step 2: Enforce the business rule from the flowchart —
    // only a PENDING reservation is allowed to be edited.
    // If it's already CANCELLED, stop here and refuse.
    if (existing.getStatus() != ReservationStatus.PENDING) { 
        throw new IllegalStateException("Only pending reservations can be updated"); 
    }
    // Step 3: Copy over ONLY the fields the buyer is allowed to change. ticket type and payment details — nothing else.
    existing.setTicketType(updatedReservation.getTicketType());
    existing.setCardNumber(updatedReservation.getCardNumber());
    existing.setCardCvc(updatedReservation.getCardCvc());
    existing.setCardExpiry(updatedReservation.getCardExpiry());
    return reservationRepository.save(existing); /* // Step 4: Save the now-updated "existing" row back to the database.
    // we are saving the "existing" (the real DB row we fetched and modified), NOT "updatedReservation" (the raw incoming request) */
}
                                                    //***DELETE***

public void deleteReservation(Long id) {
    Reservation existing = getReservation(id);

    if (existing.getStatus() != ReservationStatus.PENDING) {
        throw new IllegalStateException("Only pending reservations can be withdrawn");
    }

    existing.setStatus(ReservationStatus.CANCELLED);
    reservationRepository.save(existing);
}
}