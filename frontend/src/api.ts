export interface Event {
    id: number;
    eventName: string;
    venueLocation: string;
    eventDate: string;
    price: number;
    ticketsRemaining: number;
};

export interface Reservation {
    id: number;
    eventId: number;
    buyerName: string;
    buyerEmail: string;
    ticketType: string;
    cardNumber: string;
    cardCvc: string;
    cardExpiry: string;
    status: 'PENDING' | 'CANCELLED';
    createdAt: string;
}

    export interface Api {
    listEvents(): Promise<Event[]>; // fetches all events for the Browse Events page
    listReservationsByEmail(email: string): Promise<Reservation[]>; // fetches only this buyer's reservations, filtered by email
    getEvent(id: number): Promise<Event | undefined>; // fetches one event by id, if you need it
    // "give me the id, I'll hand you back the whole Event object." The method signature only needs to describe what goes in (just the id) and what comes out (a whole Event, or undefined if it wasn't found).
    
    addReservation(input: Omit<Reservation, 'id' | 'status' | 'createdAt'>): Promise<Reservation>; //To add a reservation, give me an object with every Reservation field except id, status, and createdAt — I don't want you supplying those, because the backend decides them.
     
    updateReservation(
        id: number,
        patch: Partial<Omit<Reservation, 'id' | 'eventId' | 'status' | 'createdAt'>>,
    ): Promise<Reservation>; /* eventId should only get omitted from the update shape — because once a reservation exists, the buyer can edit ticket type/card details, 
    but shouldn't be able to switch which event they're reserving under. That's the distinction between create vs. update. */

    cancelReservations(id: string): Promise<void>;
}

// Later, once Phase 3's API client is built, an Api interface
// goes here too — same file, same pattern as the course's api.ts




