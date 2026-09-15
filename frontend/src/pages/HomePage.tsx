import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { Grid } from "@chakra-ui/react"
import type { Event } from "../types/type";

//When this page first appears, ask the backend for the events. When they arrive, save them so the screen can show them.
// a function that returns what shows on screen.
function Homepage () { 
    const [events, setEvents] = useState<Event[]>([]); //Creates a state variable called events, starting as an empty array ([]). setEvents is the only way to update it. 
    //<Event[]> tells TypeScript "this array will hold Event objects
    // ([]) - this means startwith an empty array,
     useEffect(() => {
    fetch("http://localhost:8080/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (

    <Grid templateColumns="repeat(3, 1fr)" gap="6">
        {events.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
            ))}
    </Grid>
  )
}


export default Homepage; 