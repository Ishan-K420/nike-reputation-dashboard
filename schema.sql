-- =============================================
-- NIKE BRAND REPUTATION MONITOR
-- Database Schema & Seed Data (100 Products)
-- =============================================

CREATE TABLE Nike_Monitor (
  ProdID INT PRIMARY KEY,
  Name VARCHAR(100),
  Category VARCHAR(50),
  Score INT,
  Price FLOAT
);

-- Seed Data
INSERT INTO Nike_Monitor VALUES (1, 'Air Force 1 Low', 'Lifestyle', 73, 105);
INSERT INTO Nike_Monitor VALUES (2, 'Air Max 97', 'Lifestyle', 63, 200);
INSERT INTO Nike_Monitor VALUES (3, 'Blazer Mid ''77', 'Lifestyle', 82, 95);
INSERT INTO Nike_Monitor VALUES (4, 'Air Force 1 Pixel', 'Lifestyle', 100, 135);
INSERT INTO Nike_Monitor VALUES (5, 'Air Presto', 'Lifestyle', 88, 105);
INSERT INTO Nike_Monitor VALUES (6, 'Dunk High Retro', 'Lifestyle', 82, 200);
INSERT INTO Nike_Monitor VALUES (7, 'Dunk Low Twist', 'Lifestyle', 68, 165);
INSERT INTO Nike_Monitor VALUES (8, 'Cortez Basic Leather', 'Lifestyle', 76, 135);
INSERT INTO Nike_Monitor VALUES (9, 'Air Max 720', 'Lifestyle', 90, 105);
INSERT INTO Nike_Monitor VALUES (10, 'Air Presto Mid Utility', 'Lifestyle', 92, 180);
INSERT INTO Nike_Monitor VALUES (11, 'Air Max Dawn', 'Lifestyle', 64, 90);
INSERT INTO Nike_Monitor VALUES (12, 'Air Force 1 Ultra Flyknit', 'Lifestyle', 65, 160);
INSERT INTO Nike_Monitor VALUES (13, 'Air Max 90', 'Lifestyle', 75, 115);
INSERT INTO Nike_Monitor VALUES (14, 'Air Force 1 Gore-Tex', 'Lifestyle', 80, 145);
INSERT INTO Nike_Monitor VALUES (15, 'Air Force 1 Next Nature', 'Lifestyle', 64, 200);
INSERT INTO Nike_Monitor VALUES (16, 'Air Max Pre-Day', 'Lifestyle', 74, 175);
INSERT INTO Nike_Monitor VALUES (17, 'Air Max SC', 'Lifestyle', 71, 160);
INSERT INTO Nike_Monitor VALUES (18, 'Dunk Low Next Nature', 'Lifestyle', 97, 140);
INSERT INTO Nike_Monitor VALUES (19, 'Killshot OG', 'Lifestyle', 78, 190);
INSERT INTO Nike_Monitor VALUES (20, 'Air Huarache Runner', 'Lifestyle', 79, 195);
INSERT INTO Nike_Monitor VALUES (21, 'Air Force 1 Premium', 'Lifestyle', 73, 175);
INSERT INTO Nike_Monitor VALUES (22, 'Air Huarache SE', 'Lifestyle', 95, 170);
INSERT INTO Nike_Monitor VALUES (23, 'Air Max Dn', 'Lifestyle', 82, 180);
INSERT INTO Nike_Monitor VALUES (24, 'Air Max Plus', 'Lifestyle', 81, 120);
INSERT INTO Nike_Monitor VALUES (25, 'Cortez Textile', 'Lifestyle', 74, 120);
INSERT INTO Nike_Monitor VALUES (26, 'Air Zoom Rival Fly 3', 'Running', 93, 160);
INSERT INTO Nike_Monitor VALUES (27, 'Zoom Fly 5', 'Running', 68, 200);
INSERT INTO Nike_Monitor VALUES (28, 'Wildhorse 8', 'Running', 77, 135);
INSERT INTO Nike_Monitor VALUES (29, 'ZoomX Streakfly', 'Running', 79, 150);
INSERT INTO Nike_Monitor VALUES (30, 'Free Run Flyknit 3.0', 'Running', 87, 130);
INSERT INTO Nike_Monitor VALUES (31, 'Free Run 5.0', 'Running', 75, 275);
INSERT INTO Nike_Monitor VALUES (32, 'Pegasus Trail 4', 'Running', 72, 210);
INSERT INTO Nike_Monitor VALUES (33, 'Zoom Fly 6', 'Running', 83, 235);
INSERT INTO Nike_Monitor VALUES (34, 'Winflo 10', 'Running', 69, 155);
INSERT INTO Nike_Monitor VALUES (35, 'Winflo 11', 'Running', 73, 145);
INSERT INTO Nike_Monitor VALUES (36, 'React Infinity Run 4', 'Running', 71, 265);
INSERT INTO Nike_Monitor VALUES (37, 'Terra Kiger 9', 'Running', 90, 200);
INSERT INTO Nike_Monitor VALUES (38, 'Vaporfly 3', 'Running', 83, 180);
INSERT INTO Nike_Monitor VALUES (39, 'Pegasus Shield', 'Running', 78, 145);
INSERT INTO Nike_Monitor VALUES (40, 'Vaporfly Next% 2', 'Running', 79, 165);
INSERT INTO Nike_Monitor VALUES (41, 'Pegasus 41', 'Running', 80, 150);
INSERT INTO Nike_Monitor VALUES (42, 'Structure 25', 'Running', 77, 110);
INSERT INTO Nike_Monitor VALUES (43, 'ZoomX Invincible 3', 'Running', 91, 165);
INSERT INTO Nike_Monitor VALUES (44, 'Vaporfly Next% 3', 'Running', 65, 155);
INSERT INTO Nike_Monitor VALUES (45, 'Air Zoom Tempo Next%', 'Running', 84, 125);
INSERT INTO Nike_Monitor VALUES (46, 'Pegasus 39', 'Running', 95, 260);
INSERT INTO Nike_Monitor VALUES (47, 'ZoomX Dragonfly', 'Running', 99, 235);
INSERT INTO Nike_Monitor VALUES (48, 'Jordan 13 Retro', 'Basketball', 92, 170);
INSERT INTO Nike_Monitor VALUES (49, 'Jordan 3 Retro', 'Basketball', 99, 190);
INSERT INTO Nike_Monitor VALUES (50, 'Jordan 6 Retro', 'Basketball', 84, 200);
INSERT INTO Nike_Monitor VALUES (51, 'Jordan 12 Retro', 'Basketball', 98, 180);
INSERT INTO Nike_Monitor VALUES (52, 'GT Hustle 3', 'Basketball', 84, 120);
INSERT INTO Nike_Monitor VALUES (53, 'Jordan 1 Mid SE', 'Basketball', 93, 130);
INSERT INTO Nike_Monitor VALUES (54, 'Jordan 4 Retro', 'Basketball', 87, 195);
INSERT INTO Nike_Monitor VALUES (55, 'GT Jump 2', 'Basketball', 80, 165);
INSERT INTO Nike_Monitor VALUES (56, 'KD 17', 'Basketball', 77, 225);
INSERT INTO Nike_Monitor VALUES (57, 'Jordan 1 Retro High OG', 'Basketball', 84, 200);
INSERT INTO Nike_Monitor VALUES (58, 'Kyrie Infinity', 'Basketball', 85, 120);
INSERT INTO Nike_Monitor VALUES (59, 'Giannis Freak 6', 'Basketball', 89, 205);
INSERT INTO Nike_Monitor VALUES (60, 'Air More Uptempo Slide', 'Basketball', 75, 220);
INSERT INTO Nike_Monitor VALUES (61, 'KD 16', 'Basketball', 76, 115);
INSERT INTO Nike_Monitor VALUES (62, 'LeBron 21', 'Basketball', 84, 215);
INSERT INTO Nike_Monitor VALUES (63, 'Jordan 1 Retro Low', 'Basketball', 99, 185);
INSERT INTO Nike_Monitor VALUES (64, 'Giannis Immortality 3', 'Basketball', 71, 200);
INSERT INTO Nike_Monitor VALUES (65, 'Ja 1', 'Basketball', 81, 180);
INSERT INTO Nike_Monitor VALUES (66, 'LeBron Witness 8', 'Basketball', 81, 165);
INSERT INTO Nike_Monitor VALUES (67, 'Ja 2', 'Basketball', 95, 230);
INSERT INTO Nike_Monitor VALUES (68, 'Defy All Day', 'Training', 61, 70);
INSERT INTO Nike_Monitor VALUES (69, 'SuperRep Surge', 'Training', 77, 120);
INSERT INTO Nike_Monitor VALUES (70, 'Flex Experience Run 11', 'Training', 74, 120);
INSERT INTO Nike_Monitor VALUES (71, 'Metcon 8', 'Training', 83, 125);
INSERT INTO Nike_Monitor VALUES (72, 'Legend Essential 3', 'Training', 82, 80);
INSERT INTO Nike_Monitor VALUES (73, 'Air Monarch V', 'Training', 87, 145);
INSERT INTO Nike_Monitor VALUES (74, 'Metcon 9 AMP', 'Training', 94, 110);
INSERT INTO Nike_Monitor VALUES (75, 'Flex Experience 12', 'Training', 63, 110);
INSERT INTO Nike_Monitor VALUES (76, 'SuperRep Go 3', 'Training', 94, 160);
INSERT INTO Nike_Monitor VALUES (77, 'Free Metcon 6', 'Training', 74, 100);
INSERT INTO Nike_Monitor VALUES (78, 'Defy All Day 2', 'Training', 95, 145);
INSERT INTO Nike_Monitor VALUES (79, 'MC Trainer 2', 'Training', 73, 95);
INSERT INTO Nike_Monitor VALUES (80, 'Free Metcon 5', 'Training', 62, 160);
INSERT INTO Nike_Monitor VALUES (81, 'SB Zoom Verona Slip', 'Skate', 81, 120);
INSERT INTO Nike_Monitor VALUES (82, 'SB Janoski Canvas', 'Skate', 92, 90);
INSERT INTO Nike_Monitor VALUES (83, 'SB Janoski Slip', 'Skate', 72, 110);
INSERT INTO Nike_Monitor VALUES (84, 'SB Janoski OG+', 'Skate', 73, 95);
INSERT INTO Nike_Monitor VALUES (85, 'SB Nyjah 3', 'Skate', 73, 110);
INSERT INTO Nike_Monitor VALUES (86, 'SB Blazer Mid', 'Skate', 69, 110);
INSERT INTO Nike_Monitor VALUES (87, 'SB Force 58', 'Skate', 77, 80);
INSERT INTO Nike_Monitor VALUES (88, 'SB Dunk Mid', 'Skate', 83, 95);
INSERT INTO Nike_Monitor VALUES (89, 'SB Chron 2', 'Skate', 78, 125);
INSERT INTO Nike_Monitor VALUES (90, 'SB Dunk High', 'Skate', 66, 80);
INSERT INTO Nike_Monitor VALUES (91, 'Phantom GX 2 Pro', 'Soccer', 64, 245);
INSERT INTO Nike_Monitor VALUES (92, 'Phantom GX 2 Elite FG', 'Soccer', 82, 165);
INSERT INTO Nike_Monitor VALUES (93, 'Mercurial Superfly 9 Pro FG', 'Soccer', 91, 270);
INSERT INTO Nike_Monitor VALUES (94, 'Mercurial Vapor 15 Club', 'Soccer', 72, 215);
INSERT INTO Nike_Monitor VALUES (95, 'Premier III FG', 'Soccer', 71, 170);
INSERT INTO Nike_Monitor VALUES (96, 'Streetgato', 'Soccer', 87, 100);
INSERT INTO Nike_Monitor VALUES (97, 'Phantom Luna 2 Elite', 'Soccer', 76, 180);
INSERT INTO Nike_Monitor VALUES (98, 'Premier III TF', 'Soccer', 84, 110);
INSERT INTO Nike_Monitor VALUES (99, 'Mercurial Vapor 15 Elite', 'Soccer', 87, 130);
INSERT INTO Nike_Monitor VALUES (100, 'Tiempo Legend 10 Academy', 'Soccer', 79, 165);
