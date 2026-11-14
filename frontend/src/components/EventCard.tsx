import { ButtonGroup, Button, Card, Image, Text } from "@chakra-ui/react"
import type { TicketedEvent } from "../types/type";


interface EventCardProps {
  event: TicketedEvent; 
  onReserve: (event: TicketedEvent) => void;   
}

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
    <Card.Root flexDirection="row" maxW="xl" overflow="hidden">
      <Image objectFit="cover" maxH="200px" src={event.imageUrl} alt={event.eventName} />
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
          £{event.price}
    </Text>
      </Card.Body>
      <Card.Footer gap="2"> 
    <ButtonGroup size="sm" variant="outline">
    <Button colorPalette="gray" onClick={() => onReserve(event)}>
        Reserve Tickets
    </Button>
    </ButtonGroup>
      </Card.Footer>
    </Card.Root>
    )
}

export default EventCard