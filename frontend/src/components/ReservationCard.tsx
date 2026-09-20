import type { Reservation, TicketedEvent } from "../types/type";
import { Box, Card, Image } from "@chakra-ui/react";
import ConfirmDialogDelete from "./ConfirmDialogDelete";

interface ReservationCardProps {
  reservation: Reservation;
  event: TicketedEvent;
  onWithdraw: (reservationId: number) => void;
}

function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ReservationCard({ event, reservation, onWithdraw }: ReservationCardProps) {
  return (
    <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
    <Image objectFit="cover" maxH="200px" src={event.imageUrl} alt={event.eventName} />
      <Box>
        <Card.Body>
          <Card.Title mb="2">{event.eventName}</Card.Title>
          <Card.Description>
            <Box>Reservation ID: {reservation.id}</Box>
            <Box>{formatEventDate(event.eventDate)}</Box>
            <Box>{event.venueLocation}</Box>
            <Box>{reservation.ticketType} £{event.price}</Box>
          </Card.Description>
        </Card.Body>
        <Card.Footer>
          <ConfirmDialogDelete
            triggerLabel="Withdraw ticket"
            title="Are you sure you want to withdraw this reservation?"
            message="Your reservation will be cancelled. This can't be undone."
            confirmLabel="Yes, withdraw"
            onConfirm={() => onWithdraw(reservation.id)}
          />
        </Card.Footer>
      </Box>
    </Card.Root>
  );
}

export default ReservationCard;