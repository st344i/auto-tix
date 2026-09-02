package com.autotix.backend.event;
import org.springframework.data.repository.ListCrudRepository;

public interface EventRepository extends ListCrudRepository<Event, Long> {
} 

/*Iterable  only guarantees you can loop over it with a for loop.
CrudRepository gives an iterable that doesn't give you .get(0), .size(), .stream(), 
or any of the other convenience methods you get from List. Whereas ListCrudRepository gives us all these features. */