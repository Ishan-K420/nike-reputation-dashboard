// =============================================
// NIKE PRODUCT CATALOG GENERATOR
// =============================================
// Generates 100 unique, realistic Nike shoe names
// across 6 categories with randomized prices & scores.
// Uses a seeded PRNG for consistent results across restarts.
// =============================================

function generateProducts() {
  // Seeded PRNG for deterministic output
  let seed = 42;
  function rand() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function randInt(min, max) {
    return Math.round((min + rand() * (max - min)) / 5) * 5;
  }

  // ── Catalog: base names × variant suffixes per category ──
  const catalog = {
    Lifestyle: {
      families: [
        { base: 'Air Force 1',   suffixes: ["'07", 'Low', 'Mid', 'High', 'Shadow', 'Pixel', 'React', 'Gore-Tex', 'SE', 'Premium', 'LX', 'Next Nature', 'Craft', 'Ultra Flyknit'] },
        { base: 'Dunk',          suffixes: ['Low Retro', 'High Retro', 'Low SE', 'Low Premium', 'Low Next Nature', 'Low Twist', 'Mid'] },
        { base: 'Air Max',       suffixes: ['90', '95', '97', '1', '270', '720', 'Plus', 'Dawn', 'SC', 'Pre-Day', 'Scorpion', 'Dn'] },
        { base: 'Blazer',        suffixes: ["Mid '77", 'Low Platform', 'Mid SE'] },
        { base: 'Cortez',        suffixes: ['Classic', 'Basic Leather', 'Textile'] },
        { base: 'Air Huarache',  suffixes: ['Runner', 'Craft', 'SE'] },
        { base: 'Waffle',        suffixes: ['One', 'Trainer 2', 'Debut'] },
        { base: 'Air Presto',    suffixes: ['', 'Mid Utility', 'React'] },
        { base: 'Killshot',      suffixes: ['2', 'OG'] },
      ],
      priceRange: [85, 200],
      scoreRange: [60, 100],
      count: 25,
    },

    Running: {
      families: [
        { base: 'Pegasus',       suffixes: ['39', '40', '41', 'Trail 4', 'Shield'] },
        { base: 'Vaporfly',      suffixes: ['3', 'Next% 2', 'Next% 3'] },
        { base: 'ZoomX',         suffixes: ['Invincible 3', 'Streakfly', 'Dragonfly'] },
        { base: 'Alphafly',      suffixes: ['3', 'Next% 2'] },
        { base: 'React',         suffixes: ['Infinity Run 4', 'Miler 3'] },
        { base: 'Structure',     suffixes: ['25', '24'] },
        { base: 'Winflo',        suffixes: ['10', '11'] },
        { base: 'Zoom Fly',      suffixes: ['5', '6'] },
        { base: 'Free Run',      suffixes: ['5.0', 'Flyknit 3.0'] },
        { base: 'Wildhorse',     suffixes: ['8'] },
        { base: 'Terra Kiger',   suffixes: ['9'] },
        { base: 'Air Zoom',      suffixes: ['Tempo Next%', 'Rival Fly 3'] },
      ],
      priceRange: [90, 275],
      scoreRange: [65, 100],
      count: 22,
    },

    Basketball: {
      families: [
        { base: 'Jordan',        suffixes: ['1 Retro High OG', '1 Retro Low', '3 Retro', '4 Retro', '5 Retro', '6 Retro', '11 Retro', '12 Retro', '13 Retro', '1 Mid SE'] },
        { base: 'LeBron',        suffixes: ['21', 'Witness 8', 'NXXT Gen'] },
        { base: 'KD',            suffixes: ['16', '17'] },
        { base: 'Giannis',       suffixes: ['Immortality 3', 'Freak 6'] },
        { base: 'GT',            suffixes: ['Cut 3', 'Jump 2', 'Hustle 3'] },
        { base: 'Air More Uptempo', suffixes: ["'96", 'Slide'] },
        { base: 'Kyrie',         suffixes: ['Low 5', 'Infinity'] },
        { base: 'Ja',            suffixes: ['1', '2'] },
      ],
      priceRange: [110, 250],
      scoreRange: [70, 100],
      count: 20,
    },

    Training: {
      families: [
        { base: 'Metcon',        suffixes: ['9', '8', '9 AMP'] },
        { base: 'Free Metcon',   suffixes: ['5', '6'] },
        { base: 'SuperRep',      suffixes: ['Go 3', 'Surge'] },
        { base: 'MC Trainer',    suffixes: ['2', '3'] },
        { base: 'Legend Essential', suffixes: ['3', '2'] },
        { base: 'Flex Experience', suffixes: ['12', 'Run 11'] },
        { base: 'Defy All Day',  suffixes: ['', '2'] },
        { base: 'Air Monarch',   suffixes: ['IV', 'V'] },
      ],
      priceRange: [65, 165],
      scoreRange: [60, 95],
      count: 13,
    },

    Skate: {
      families: [
        { base: 'SB Dunk',       suffixes: ['Low', 'Low Pro', 'High', 'Mid'] },
        { base: 'SB Blazer',     suffixes: ['Mid', 'Low GT'] },
        { base: 'SB Janoski',    suffixes: ['OG+', 'Canvas', 'Slip'] },
        { base: 'SB Chron',      suffixes: ['2', 'Solarsoft'] },
        { base: 'SB Nyjah',      suffixes: ['Free 2', '3'] },
        { base: 'SB Force 58',   suffixes: ['', 'Premium'] },
        { base: 'SB Zoom Verona', suffixes: ['', 'Slip'] },
      ],
      priceRange: [75, 130],
      scoreRange: [65, 98],
      count: 10,
    },

    Soccer: {
      families: [
        { base: 'Mercurial Superfly', suffixes: ['9 Elite FG', '10 Academy', '9 Pro FG'] },
        { base: 'Mercurial Vapor',    suffixes: ['15 Elite', '16 Academy', '15 Club'] },
        { base: 'Phantom GX',         suffixes: ['2 Elite FG', '2 Academy', '2 Pro'] },
        { base: 'Phantom Luna',       suffixes: ['2 Elite', '2 Pro'] },
        { base: 'Tiempo Legend',      suffixes: ['10 Elite FG', '10 Academy', '10 Pro'] },
        { base: 'Premier',            suffixes: ['III FG', 'III TF'] },
        { base: 'Streetgato',         suffixes: ['', 'Premium'] },
      ],
      priceRange: [50, 275],
      scoreRange: [60, 100],
      count: 10,
    },
  };

  // ── Build products ──
  const products = [];
  let id = 1;

  for (const [category, cfg] of Object.entries(catalog)) {
    // Flatten all possible shoe names for this category
    const pool = [];
    for (const fam of cfg.families) {
      for (const sfx of fam.suffixes) {
        pool.push(sfx ? `${fam.base} ${sfx}` : fam.base);
      }
    }

    // Shuffle & pick 'count' unique names
    const picked = shuffle(pool).slice(0, cfg.count);

    for (const name of picked) {
      products.push({
        ProdID: id++,
        Name: name,
        Category: category,
        Score: Math.round(cfg.scoreRange[0] + rand() * (cfg.scoreRange[1] - cfg.scoreRange[0])),
        Price: randInt(cfg.priceRange[0], cfg.priceRange[1]),
      });
    }
  }

  return products;
}

module.exports = { generateProducts };
