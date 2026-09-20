import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { VStack } from "@chakra-ui/react"
import type { TicketedEvent } from "../types/type";


interface HomeProps {
  onReserve: (event: TicketedEvent) => void;
}

function Home({ onReserve }: HomeProps) { 
    const [events, setEvents] = useState<TicketedEvent[]>([]);

    useEffect(() => {
      fetch("http://localhost:8080/api/events")
        .then((res) => res.json())
        .then((data) => setEvents(data));
    }, []);

return (
  <VStack gap="6" align="center" width="100%">
    {events.slice(0, 3).map((event) => (
      <EventCard key={event.id} event={event} onReserve={onReserve} />
    ))}
  </VStack>
);
}
export default Home;

