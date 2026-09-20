import { Box, Button, Card, Image } from "@chakra-ui/react";
import type { Reservation, TicketedEvent } from "../types/type";

interface ReservationConfirmPageProps {
  reservation: Reservation;
  event: TicketedEvent;
  onReturn: () => void;
}

function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ReservationConfirmPage({ event, reservation, onReturn }: ReservationConfirmPageProps) {
  const handleReturn = () => {
    onReturn();
  };

  return (
    <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
      <Image objectFit="cover" maxW="200px" src={event.imageUrl} alt={event.eventName} />
      <Box>
        <Card.Body>
          <Card.Title mb="2">Your ticket has been reserved!</Card.Title>
        <Card.Description>
        <Box>Reservation ID: {reservation.id}</Box>
        <Box>{event.eventName}</Box>
        <Box> {formatEventDate(event.eventDate)}</Box>
        <Box>{event.venueLocation}</Box>
        <Box>£{event.price}</Box>
        </Card.Description>
        </Card.Body>
        <Card.Footer>
          <Button onClick={handleReturn}>Return to home</Button>
        </Card.Footer>
      </Box>
    </Card.Root>
  );
}

export default ReservationConfirmPage;