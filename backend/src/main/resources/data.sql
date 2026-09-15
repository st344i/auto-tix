DELETE FROM reservations;
DELETE FROM events;
ALTER TABLE events AUTO_INCREMENT = 30001;
ALTER TABLE reservations AUTO_INCREMENT = 1;

INSERT INTO events (image_url, event_name, event_date, venue_location, price, tickets_remaining) VALUES
('https://github.com/st344i/auto-tix/blob/20e24f79f8e378a430b41ae0ce3ee5e5a8f9c63e/frontend/src/assets/images/Jaz%20Sullivan.jpg?raw=true', 'Jazmine Sullivan', '2026-12-01 10:00:00', 'The Jazz Cafe, London', 80.00, 100),
('https://github.com/st344i/auto-tix/blob/20e24f79f8e378a430b41ae0ce3ee5e5a8f9c63e/frontend/src/assets/images/jayz.jpg?raw=true', 'Jayz 30', '2026-09-04 10:00:00', 'O2, London', 150.00, 100),
('https://github.com/st344i/auto-tix/blob/main/frontend/src/assets/images/lauryn-hill.jpg?raw=true', 'Lauryn Hill', '2026-10-01 10:00:00', 'OVO Wembley Arena, London', 100.00, 100);

INSERT INTO reservations (event_id, buyer_name, buyer_email, ticket_type, payment_details, status) VALUES
(30001, 'Jane Doe', 'jane@example.com', 'General', 'Card ending 4242', 'PENDING'),
(30002, 'John Doe', 'john@example.com', 'VIP', 'Card ending 1881', 'PENDING'),
(30003, 'Jess Doe', 'jess@example.com', 'General', 'Card ending 2534', 'PENDING');


