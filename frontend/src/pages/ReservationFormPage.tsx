import ReservationForm from "../components/ReservationForm";
import type { Reservation, TicketedEvent } from "../types/type";

interface ReservationFormPageProps {
  onCancel: () => void;
  onReserve: (reservation: Reservation, event: TicketedEvent) => void; 
  ticketedEvent: TicketedEvent; 
}

function ReservationFormPage({ onCancel, onReserve, ticketedEvent }: ReservationFormPageProps) {
  return (
    <div>
      <ReservationForm onCancel={onCancel} onReserve={onReserve} ticketedEvent={ticketedEvent} />
    </div>
  );
}

export default ReservationFormPage;