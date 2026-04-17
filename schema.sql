-- =============================================
-- NIKE BRAND REPUTATION MONITOR
-- Database Schema & Seed Data (20 Products)
-- =============================================

CREATE TABLE Nike_Monitor (
  ProdID INT PRIMARY KEY,
  Name VARCHAR(50),
  Category VARCHAR(50),
  Score INT,
  Price INT
);

-- Lifestyle
INSERT INTO Nike_Monitor VALUES (1,  'Air Force 1',       'Lifestyle',     85, 110);
INSERT INTO Nike_Monitor VALUES (5,  'Dunk Low',          'Lifestyle',     88, 110);
INSERT INTO Nike_Monitor VALUES (6,  'Air Max 97',        'Lifestyle',     82, 175);
INSERT INTO Nike_Monitor VALUES (7,  'Air Max 270',       'Lifestyle',     79, 150);
INSERT INTO Nike_Monitor VALUES (9,  'Blazer Mid 77',     'Lifestyle',     83, 105);
INSERT INTO Nike_Monitor VALUES (14, 'Air Huarache',      'Lifestyle',     76, 130);
INSERT INTO Nike_Monitor VALUES (16, 'Cortez',            'Lifestyle',     77,  90);
INSERT INTO Nike_Monitor VALUES (18, 'Air Presto',        'Lifestyle',     80, 130);

-- Running
INSERT INTO Nike_Monitor VALUES (2,  'Air Max 90',        'Running',       92, 130);
INSERT INTO Nike_Monitor VALUES (3,  'Pegasus 40',        'Running',       78, 120);
INSERT INTO Nike_Monitor VALUES (10, 'Vaporfly 3',        'Running',       96, 260);
INSERT INTO Nike_Monitor VALUES (11, 'ZoomX Invincible',  'Running',       89, 180);
INSERT INTO Nike_Monitor VALUES (13, 'Free Run 5.0',      'Running',       81, 100);
INSERT INTO Nike_Monitor VALUES (15, 'React Infinity 4',  'Running',       84, 165);

-- Basketball
INSERT INTO Nike_Monitor VALUES (4,  'Jordan 1 Retro',    'Basketball',    95, 170);
INSERT INTO Nike_Monitor VALUES (8,  'Jordan 4 Retro',    'Basketball',    94, 210);
INSERT INTO Nike_Monitor VALUES (19, 'Jordan 11 Retro',   'Basketball',    93, 225);

-- Training
INSERT INTO Nike_Monitor VALUES (12, 'Metcon 9',          'Training',      87, 135);
INSERT INTO Nike_Monitor VALUES (20, 'Air Monarch IV',    'Training',      72,  75);

-- Skateboarding
INSERT INTO Nike_Monitor VALUES (17, 'SB Dunk Low',       'Skateboarding', 91, 115);
