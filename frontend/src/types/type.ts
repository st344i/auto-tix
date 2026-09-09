interface Events {
    id: string;
    imageUrl: string;
    name: string;
    eventdate: string
    venuelocation: string
    price: string
    ticketsremaining: string
    
}

const events: Event[] = [
    { id: '0001', eventname: 'Summer Festival', eventdate: '2026-12-01 10:00:00', venuelocation: 'Hyde Park, London', price: '60.00', ticketsremaining: '100'  imageUrl: '/events/summerfestival.svg' },
    { id: '0002', eventname: 'Jayz 30', eventdate: '2026-09-04 10:00:00', venuelocation: 'O2, London', price: '150.00', ticketsremaining: '100', imageUrl: '/events/jayz30.svg' },
    { id: '0003', eventname: 'CBF Fest 2026', eventdate: '2026-10-01 10:00:00', venuelocation: 'ExCeL London', price: '30.00', ticketsremaining: '100', imageUrl: '/events/cbffest.svg' },  
];

interface Reservations {
    id: string;
    imageUrl: string; 
    name: string;
    eventdate: string
    venuelocation: string
    price: string
    ticketsremaining: string
    
}


