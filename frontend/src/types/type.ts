
export interface Event {
    id: number;
    imageUrl: string;
    eventName: string;
    eventDate: string;
    venueLocation: string;
    price: number;
    ticketsRemaining: number;
    
}

export interface Reservation {
    id: number;
    eventId: number;
    buyerName: string;
    buyerEmail: string;
    ticketType: string;
    cardNumber: number;
    cardCvc: number;
    cardExpiry: number;
    status: 'PENDING' | 'CANCELLED';
    createdAt: string;
}
