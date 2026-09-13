package com.autotix.backend.reservation;
import java.util.List;

import org.springframework.data.repository.ListCrudRepository;

public interface ReservationRepository extends ListCrudRepository<Reservation, Long> {

    List<Reservation> findByBuyerEmail(String buyerEmail); //always make sure List is imported (doesnt imply to ListCrudRepository)

}