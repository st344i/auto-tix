

export type Page =
  | "home"
  | "myTix"
  | "howItWorks"
  | "reservationForm"
  | "reservationConfirm"
  | "reservationDelete";


export interface TicketedEvent {
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
    event: TicketedEvent;
    buyerFirstname: string;
    buyerLastname: string;
    buyerEmail: string;
    ticketType: string;
    cardNumber: string;
    cardCvc: string;
    cardExpiry: string;
    status: 'PENDING' | 'CANCELLED';
    createdAt: string;
}


