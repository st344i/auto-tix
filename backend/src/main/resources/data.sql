DELETE FROM reservations;
DELETE FROM events;
ALTER TABLE events AUTO_INCREMENT = 1;
ALTER TABLE reservations AUTO_INCREMENT = 1;

INSERT INTO events (image_url, event_name, event_date, venue_location, price, tickets_remaining) VALUES
('images/Jaz%20Sullivan.jpg', 'Jazmine Sullivan', '2026-12-01 10:00:00', 'The Jazz Cafe, London', 80.00, 100),
('images/jayz.jpg', 'Jayz 30', '2026-09-04 10:00:00', 'O2, London', 150.00, 100),
('images/lauryn-hill.jpg', 'Lauryn Hill', '2026-10-01 10:00:00', 'OVO Wembley Arena, London', 100.00, 100);

INSERT INTO reservations (event_id, buyer_name, buyer_email, ticket_type, card_number, card_cvc, card_expiry, status) VALUES
(1, 'Jane Doe', 'jane@example.com', 'General Admission', '3333 4444 5555 6666', '345', '02/26', 'PENDING'),
(2, 'John Doe', 'john@example.com', 'VIP', '3333 4444 5555 6666', '345', '02/26', 'PENDING'),
(3, 'Jess Doe', 'jess@example.com', 'VIP', '3333 4444 5555 6666', '345', '02/26', 'PENDING');
