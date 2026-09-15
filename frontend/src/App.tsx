import { useState } from "react";
import Homepage from "./pages/HomePage";
// import MyReservationPage from "./pages/MyReservationPage";
// import HowItWorksPage from "./pages/HowItWorksPage";

type Page = "home" | "reservations" | "howItWorks";
function App() {
  const [currentPage] = useState<Page>("home");

  return (
    <div>
      {/* <NavBar onNavigate={setCurrentPage} /> */}
      {currentPage === "home" && <Homepage />}
    </div>
  );
}

export default App;