import { useState } from "react";
import Home from "./page/Home";
import ReservationFormPage from "./page/ReservationFormPage";
import ReservationConfirmPage from "./page/ReservationConfirmPage";
import MyTixPage from "./page/MyTixPage";
import ReservationDelete from "./page/ReservationDelete";
import HowItWorks from "./page/HowItWorks";
import type { TicketedEvent, Reservation } from "./types/type";
import NavBar from "./components/NavBar";
import type {Page} from "./types/type";


function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedEvent, setSelectedEvent] = useState<TicketedEvent | null>(null);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [confirmedEvent, setConfirmedEvent] = useState<TicketedEvent | null>(null);

  function renderPage() {
    switch (currentPage) {
      case "home":
        return (
          <Home
            onReserve={(event: TicketedEvent) => {
              setSelectedEvent(event);
              setCurrentPage("reservationForm");
            }}
          />
        );

  case "myTix":
      return <MyTixPage onWithdrawSuccess={() => setCurrentPage("reservationDelete")} />;
  
    case "reservationDelete":
      return <ReservationDelete onReturn={() => setCurrentPage("home")} />;

        case "howItWorks":
      return <HowItWorks onReturn={() => setCurrentPage("home")} />;
      
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
          <Home
            onReserve={(event) => {
              setSelectedEvent(event);
              setCurrentPage("reservationForm");
            }}
          />
        );
    }
  }

  return (
    <div>
      <NavBar onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;