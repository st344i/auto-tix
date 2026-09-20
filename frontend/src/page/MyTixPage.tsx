import { useState, useEffect } from "react";
import { VStack } from "@chakra-ui/react";
import ReservationCard from "../components/ReservationCard";
import type { Reservation } from "../types/type";

interface MyTixPageProps {
  onWithdrawSuccess: () => void;
}

function MyTixPage({ onWithdrawSuccess }: MyTixPageProps) {
  const [reservations, setReservations] = useState<Reservation[]>([]);

useEffect(() => {
  async function loadData() {
    const res = await fetch("http://localhost:8080/api/reservations");
    const data = await res.json();
    setReservations(data.filter((r: Reservation) => r.status === "PENDING"));
  }
  loadData();
}, []);

  const handleWithdraw = async (reservationId: number) => {
    await fetch(`http://localhost:8080/api/reservations/${reservationId}`, {
      method: "DELETE",
    });
    setReservations((prev) => prev.filter((r) => r.id !== reservationId));
    onWithdrawSuccess();
  };

return (
  <VStack gap="6" align="center" width="100%">
    {reservations.slice(0, 1).map((reservation) => (
      <ReservationCard
        key={reservation.id}
        reservation={reservation}
        event={reservation.event}
        onWithdraw={handleWithdraw}
      />
    ))}
  </VStack>
);
}
export default MyTixPage;