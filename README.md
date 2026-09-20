# Autotix — Ticket Pre-Authorisation Platform

Autotix lets buyers browse upcoming events and submit a **pre-authorisation** — reserving a ticket ahead of the official on-sale, at today's price, ahead of an actual purchase. Buyers can view and withdraw their pending pre-authorisations from "My Tix".

> **Scope note:** Buyer registration/login is out of scope for this MVP — buyers identify themselves by name and email directly on the pre-authorisation form, and "My Tix" currently lists all pending reservations rather than filtering by buyer. The on-sale matching engine (batching, funds checks, waitlist release, organiser dashboard) is also out of scope — see `Autotix_PreAuth_MVP_Flowchart` for how it's intended to work as a future stage.

## Tech Stack

- **Frontend:** React (TypeScript) + Vite, Chakra UI v3
- **Backend:** Java 21, Spring Boot, Spring Data JPA
- **Database:** MySQL
- **Containerisation:** Docker Compose

## Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose
- (Only for running outside Docker) Node.js 20+, Java 21, Maven, a local MySQL 8 instance

## Running the Full Stack with Docker

1. **Copy the environment template and set your own values:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env`:

   ```
   MYSQL_ROOT_PASSWORD=your_own_password
   MYSQL_DATABASE=autotix
   ```

2. **Start all three services:**

   ```bash
   docker compose up --build
   ```

   This builds and starts:
   - `mysql-db` — MySQL 8, seeded automatically on first start via `data.sql`
   - `backend` — Spring Boot API on port 8080, waits for MySQL to report healthy before starting
   - `frontend` — Vite dev server on port 5173

3. **Access the application:**

   | Service | URL |
   |---|---|
   | Frontend (React app) | http://localhost:5173 |
   | Backend API | http://localhost:8080/api |

4. **Stop the stack:**

   ```bash
   docker compose down
   ```

   Add `-v` to also wipe the MySQL data volume and reset to a clean seed on next start: `docker compose down -v`

## Environment Variables

Database credentials are injected via Docker Compose, **not** hardcoded in `application.properties`.

| Variable | Description |
|---|---|
| `MYSQL_ROOT_PASSWORD` | MySQL root password, used by both the `mysql-db` and `backend` containers |
| `MYSQL_DATABASE` | Database name |

For local (non-Docker) development, the backend reads datasource settings from `backend/src/main/resources/local.properties` (gitignored — create your own from the example below, it is never committed):

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/autotix
spring.datasource.username=root
spring.datasource.password=your_local_password
```

## Database

- Table schema is generated automatically from the JPA entities (`spring.jpa.hibernate.ddl-auto=update`) rather than a separate `schema.sql`.
- Seed data lives in `backend/src/main/resources/data.sql` and runs automatically on every backend startup (`spring.sql.init.mode=always`) — it clears and re-inserts 3 sample events and 3 sample reservations, so the app is populated with realistic data immediately.
- Any reservations a reviewer submits while testing will be cleared on the next backend restart, since `data.sql` re-runs each time.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/events` | List all events |
| GET | `/api/events/{id}` | Get a single event |
| GET | `/api/reservations` | List all reservations |
| GET | `/api/reservations/{id}` | Get a single reservation |
| POST | `/api/reservations` | Submit a new pre-authorisation |
| PUT | `/api/reservations/{id}` | Update a pending pre-authorisation (ticket type / payment details only) |
| DELETE | `/api/reservations/{id}` | Withdraw a pending pre-authorisation (sets status to `CANCELLED`) |

Only a `PENDING` reservation can be updated or withdrawn — attempting either on a `CANCELLED` reservation returns `409 Conflict`. An unknown event or reservation ID returns `404 Not Found`. All error responses follow a consistent JSON shape (status, error, message, path) via a global exception handler.

## Running Without Docker (local development)

**Backend:**
```bash
cd backend
./mvnw spring-boot:run
```
Requires a local MySQL instance and a `local.properties` file as described above.

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
auto-tix/
├── backend/    # Spring Boot API (Controller → Service → Repository per feature)
├── frontend/   # React + TypeScript app (Vite, Chakra UI)
├── docker-compose.yml
├── .env.example
└── README.md
```

## Known Limitations (MVP scope)

- No buyer authentication — "My Tix" shows all pending reservations, not filtered per buyer.
- The on-sale matching engine, funds checks, waitlist release, and organiser dashboard are not implemented — documented as the next intended stage in the project flowchart, out of scope for this build.
