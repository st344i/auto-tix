package com.autotix.backend.event;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;

public interface EventRepository extends ListCrudRepository<Event, Long> {
}