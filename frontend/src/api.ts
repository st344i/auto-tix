import type { Event, Reservation } from "./types/type";

export interface Api { //This defines a shape — a contract describing what methods something must have and what they must return/. export makes it importable elsewhere.
  listEvents(): Promise<Event[]>; // this method, when awaited, gives you back an array of Events. [] - an array of this type

  listReservationsByEmail(email: string): Promise<Reservation[]>; // fetches only this buyer's reservations, filtered by email

  getEvent(id: number): Promise<Event | undefined>; // fetches one event by id, if you need it
  // "give me the id, I'll hand you back the whole Event object." The method signature only needs to describe what goes in (just the id) and what comes out (a whole Event, or undefined if it wasn't found).

  addReservation(
    input: Omit<Reservation, "id" | "status" | "createdAt">,
  ): Promise<Reservation>; //To add a reservation, give me an object with every Reservation field except id, status, and createdAt — I don't want you supplying those.

  updateReservation(
    id: number,
    patch: Partial<
      Omit<Reservation, "id" | "eventId" | "status" | "createdAt">
    >,
  ): Promise<Reservation>; /* eventId should only get omitted from the update shape — because once a reservation exists, the buyer can edit ticket type/card details, 
    but shouldn't be able to switch which event they're reserving under. That's the distinction between create vs. update. */

  cancelReservations(id: number): Promise<void>;
}

// Later, once Phase 3's API client is built, an Api interface
// goes here too — same file, same pattern as the course's api.ts

const BASE_URL: string = "http://localhost:8080"; // to receive information from springboot

function ensureOk(response: Response, action: string): void {
  if (!response.ok) {
    throw new Error(
      `Failed to ${action}: the server responded with ` +
        `${response.status} ${response.statusText}. ` +
        `Is the API server running? Start it with: npm run api`,
    );
  }
}

const httpApi: Api = {
  async listEvents() {
    const response = await fetch(`${BASE_URL}/events`);
    ensureOk(response, "list the events");
    return (await response.json()) as Event[];
  },

  async listReservationsByEmail(email) {
    const response = await fetch(
      `${BASE_URL}/reservations?buyeremail=${email}`,
    );
    ensureOk(response, "list the reservations");
    return (await response.json()) as Reservation[];
  },

  async getEvent(id) {
    const response = await fetch(`${BASE_URL}/events/${id}`);
    if (response.status === 404) {
      return undefined;
    }
    ensureOk(response, `get event ${id}`);
    return (await response.json()) as Event;
  },

  async addReservation(
    reservation: Omit<Reservation, "id" | "status" | "createdAt">,
  ): Promise<Reservation> {
    const response = await fetch(`${BASE_URL}/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservation),
    });
    ensureOk(response, `add reservation`); // add event object
    return (await response.json()) as Reservation;
  },

  async updateReservation(id, patch) {
    const response = await fetch(`${BASE_URL}/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    ensureOk(response, `update reservation ${id}`);
    return (await response.json()) as Reservation;
  },

  async cancelReservations(id) {
    const response = await fetch(`${BASE_URL}/reservations/${id}`, {
      method: "DELETE",
    });
    ensureOk(response, `cancel reservation ${id}`);
  },
};
