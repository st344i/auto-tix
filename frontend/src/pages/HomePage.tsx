import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { Grid } from "@chakra-ui/react"
import type { TicketedEvent } from "../types/type";

interface HomePageProps {
  onReserve: (event: TicketedEvent) => void;
}

function HomePage({ onReserve }: HomePageProps) { 
    const [events, setEvents] = useState<TicketedEvent[]>([]);

    useEffect(() => {
      fetch("http://localhost:8080/api/events")
        .then((res) => res.json())
        .then((data) => setEvents(data));
    }, []);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="6">
        {events.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} onReserve={onReserve} />
        ))}
    </Grid>
  )
}

export default HomePage;