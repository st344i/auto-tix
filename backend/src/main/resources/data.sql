DELETE FROM reservations;
DELETE FROM events;
ALTER TABLE events AUTO_INCREMENT = 1;
ALTER TABLE reservations AUTO_INCREMENT = 1;

INSERT INTO events (event_name, event_date, venue_location, price, tickets_remaining) VALUES
('Summer Festival', '2026-12-01 10:00:00', 'Hyde Park, London', 60.00, 100),

('Jayz 30', '2026-09-04 10:00:00', 'O2, London', 150.00, 100),

('CBF Fest 2026', '2026-10-01 10:00:00', 'ExCeL London', 30, 100);

INSERT INTO reservations (event_id, buyer_name, buyer_email, ticket_type, payment_details, status) VALUES
(0001, 'Jane Doe', 'jane@example.com', 'General', 'Card ending 4242', 'PENDING'),
(0002, 'John Doe', 'john@example.com', 'VIP', 'Card ending 1881', 'PENDING'),
(0003, 'Jess Doe', 'jess@example.com', 'General', 'Card ending 2534', 'PENDING');


