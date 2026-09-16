import { useState } from "react";
import HomePage from "./pages/HomePage";
import ReservationFormPage from "./pages/ReservationFormPage";
import ReservationConfirmPage from "./pages/ReservationConfirmPage";
import type { TicketedEvent, Reservation } from "./types/type";

type Page = "home" | "reservations" | "howItWorks" | "reservationForm" | "reservationConfirm";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedEvent, setSelectedEvent] = useState<TicketedEvent | null>(null);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [confirmedEvent, setConfirmedEvent] = useState<TicketedEvent | null>(null);

  function renderPage() {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onReserve={(event) => {
              setSelectedEvent(event);
              setCurrentPage("reservationForm");
            }}
          />
        );

      case "reservationForm":
        return selectedEvent ? (
          <ReservationFormPage
            ticketedEvent={selectedEvent}
            onCancel={() => setCurrentPage("home")}
            onReserve={(reservation, event) => {
              setConfirmedReservation(reservation);
              setConfirmedEvent(event);
              setCurrentPage("reservationConfirm");
            }}
          />
        ) : null;

      case "reservationConfirm":
        return confirmedReservation && confirmedEvent ? (
          <ReservationConfirmPage
            reservation={confirmedReservation}
            event={confirmedEvent}
            onReturn={() => setCurrentPage("home")}
          />
        ) : null;

      default:
        return (
          <HomePage
            onReserve={(event) => {
              setSelectedEvent(event);
              setCurrentPage("reservationForm");
            }}
          />
        );
    }
  }

  return <div>{renderPage()}</div>;
}

export default App;