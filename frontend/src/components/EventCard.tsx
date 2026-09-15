import {  } from 'react';
import { Button, Card, Image, Text } from "@chakra-ui/react"
import type { Event } from "../types/type";


interface EventCardProps {
  event: Event;   // ← ONE prop, called "event"
}// you're using it to describe the shape of your prop.

function EventCard({ event }: EventCardProps) { // function declaration
    return (
    <Card.Root maxW="sm" overflow="hidden">
      <Image
        src={event.imageUrl}
        alt={event.eventName}
      />
      <Card.Body gap="2">
        <Card.Title>{event.eventName}  {event.eventdate}</Card.Title>
        <Card.Description>
          {event.venuelocation}
        </Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          {event.price}
    </Text>
      </Card.Body>
      <Card.Footer gap="2">
         <Button variant="ghost">Find out more</Button>
         <Button variant="solid">Reserve Tickets</Button>
      </Card.Footer>
    </Card.Root>
    )
}

export default EventCard