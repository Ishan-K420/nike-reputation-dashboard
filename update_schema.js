const fs = require('fs');
const { generateProducts } = require('./server/utils/generateProducts');

const products = generateProducts();

let sql = `-- =============================================
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
`;

products.forEach(p => {
  sql += `INSERT INTO Nike_Monitor VALUES (${p.ProdID}, '${p.Name.replace(/'/g, "''")}', '${p.Category}', ${p.Score}, ${p.Price});\n`;
});

fs.writeFileSync('schema.sql', sql);
console.log('Schema updated successfully with 100 products.');
