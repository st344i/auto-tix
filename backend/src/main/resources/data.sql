INSERT INTO events (name, event_date, venue, ticket_type, price, ticketsRemaining) VALUES

('Summer Festival', '2026-12-01 10:00:00', 'Hyde Park, London', 'General', 100.00, 500),

('Jazz Night', '2026-11-01 10:00:00', 'Ronnie Scott\'s, London', 'VIP', 85.00, 100),

('Tech Conference 2026', '2026-10-01 10:00:00', 'ExCeL London', 'Standard', 120.00, 1000);

INSERT INTO reservation (event_id, buyer_name, buyer_email, ticket_type, payment_details, status) VALUES
(0001, 'Jane Doe', 'jane@example.com', 'General', 'Card ending 4242', 'PENDING'),
(0002, 'Sam Okafor', 'sam@example.com', 'VIP', 'Card ending 1881', 'PENDING');

