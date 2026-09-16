import {  } from 'react';
import { Button, Card, Image, Text } from "@chakra-ui/react"
import type { TicketedEvent } from "../types/type";



interface EventCardProps {
  event: TicketedEvent; 
  onReserve: (event: TicketedEvent) => void;   // ← ONE prop, called "event"
}// you're using it to describe the shape of your prop.

function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function EventCard({ event, onReserve }: EventCardProps) { // function declaration
    return (
    <Card.Root maxW="sm" overflow="hidden">
      <Image
        src={event.imageUrl}
        alt={event.eventName}
      />

      <Card.Body gap="2">
        <Card.Title>{event.eventName} 
          </Card.Title>
         <Card.Description>
          {formatEventDate(event.eventDate)}
        </Card.Description>
        <Card.Description>
          {event.venueLocation}
        </Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          {event.price}
    </Text>
      </Card.Body>
      <Card.Footer gap="2">
         <Button variant="solid" onClick={() => { console.log("Reserve clicked", event); onReserve(event); }}>
            Reserve Tickets
        </Button>
      </Card.Footer>
    </Card.Root>
    )
}

export default EventCard