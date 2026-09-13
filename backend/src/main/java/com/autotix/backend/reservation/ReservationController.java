package com.autotix.backend.reservation;

import java.util.List;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/reservations") //reservations from the reservation.java (table= reservations)
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) { /* This is how Spring gives the controller access to the service — 
        it doesn't new reservationService() itself, Spring hands it a ready-made instance.*/
        this.reservationService = reservationService;
    }

/* information gets requested from the Controller, and the Controller responds
the browser sends the GET /api/reservations request, triggered by the React useEffect. 
Your reservationController sits and waits for that request to arrive, then hands back whatever reservationService.getAllreservations() gives it. 
 */ 


    @GetMapping
    public List<Reservation> getReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/reservations")
    public List<Reservation> getReservationsByEmail(@RequestParam String buyeremail) {
        return reservationService.getReservationsByEmail(buyeremail);
    }

    @GetMapping("/{id}")
    public Reservation getReservation(@PathVariable Long id) {
        return reservationService.getReservation(id);
    }

    // POST /api/reservations — Submit (Criteria met? → Consent → Submit)
    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.createReservation(reservation);
    }

    @PutMapping("/{id}")
    public Reservation updateReservation(@PathVariable Long id, @RequestBody Reservation updatedreservation) {
        return reservationService.updateReservation(id, updatedreservation);
    }
    
    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id); //no return as it's a void method
}
}