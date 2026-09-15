import {  } from 'react';
import type { Reservation } from "../types/type";
import type { Event } from "../types/type";
import { Box, Button, Card, Image } from "@chakra-ui/react"

interface ReservationCardProps {
  reservation: Reservation;
  event: Event;
}

function ReservationCard({ event, reservation }: ReservationCardProps) {

return(
  <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
    <Image
    objectFit="cover"
    maxW="200px"
    src={event.imageUrl}
    alt={event.eventName}
    />
    <Box>
      <Card.Body>
        {reservation.eventId}
        <Card.Title mb="2">Your ticket has been reserved!</Card.Title>
      </Card.Body>
        <Card.Description>
          {event.eventName} {reservation.ticketType}
          {event.eventDate}
          {event.venueLocation}
        </Card.Description>
      <Card.Footer>
        <Button>View Tickets</Button>
      </Card.Footer>
    </Box>
  </Card.Root>
)
    }

export default ReservationCard;    