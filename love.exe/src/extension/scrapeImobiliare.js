/**
 * scrapeImobiliare.js
 * Utilitar de scraping pentru anunțuri imobiliare (imobiliare.ro)
 * Extrage: titlu, pret, pret/mp, descriere, adresa/cartier
 *
 * Utilizare în React:
 *   import { scrapeImobiliare } from './scrapeImobiliare';
 *
 *   // din text HTML (string)
 *   const result = scrapeImobiliare(htmlString);
 *
 *   // din File input (<input type="file">)
 *   const result = await scrapeImobiliareFromFile(file);
 */

// ---------------------------------------------------------------------------
// 1. Extrage datele principale din evenimentul GA4 "view_item"
// ---------------------------------------------------------------------------
function extractViewItem(html) {
  const match = html.match(/"event"\s*:\s*"view_item".*?"items"\s*:\s*(\[.*?\])\s*\}/s);
  if (!match) return {};
  try {
    const items = JSON.parse(match[1]);
    return items[0] ?? {};
  } catch {
    return {};
  }
}

// ---------------------------------------------------------------------------
// 2. Extrage oferta (pret + moneda) din schema.org LD+JSON
// ---------------------------------------------------------------------------
function extractOffer(html) {
  const match = html.match(/"@type"\s*:\s*"Offer".*?"priceSpecification"\s*:\s*(\{[^}]+\})/s);
  if (!match) return {};
  try {
    return JSON.parse(match[1]);
  } catch {
    return {};
  }
}

// ---------------------------------------------------------------------------
// 3. Extrage suprafata din schema.org Accommodation
// ---------------------------------------------------------------------------
function extractAccommodation(html) {
  const match = html.match(/"@type"\s*:\s*"Accommodation"\s*,\s*(.*?)\}/s);
  if (!match) return {};
  try {
    return JSON.parse('{"@type":"Accommodation",' + match[1] + "}");
  } catch {
    return {};
  }
}

// ---------------------------------------------------------------------------
// 4. Extrage adresa din schema.org + GA4
// ---------------------------------------------------------------------------
function extractAddress(html) {
  const result = {};

  // Strada din schema.org (a doua adresa e de obicei a proprietatii)
  const streets = [...html.matchAll(/"streetAddress"\s*:\s*"([^"]+)"/g)].map((m) => m[1]);
  for (const s of streets) {
    if (s.includes("Cluj-Napoca") || s.includes("Napoca") || !s.includes("Timişoara")) {
      if (s.length > 5 && !s.includes("Babeş")) {
        result.strada = s.trim();
        break;
      }
    }
  }

  // Cartier din addressLocality (schema.org)
  const localities = [...html.matchAll(/"addressLocality"\s*:\s*"([^"]+)"/g)].map((m) => m[1]);
  for (const loc of localities) {
    if (!["Timişoara", "Timisoara", "București", "Bucuresti"].includes(loc)) {
      result.cartier = loc.trim();
      break;
    }
  }

  // Oras, cartier, judet din GA4
  const ga4City = firstGA4Value(html, "propertyCity");
  const ga4Area = firstGA4Value(html, "propertyArea");
  const ga4County = firstGA4Value(html, "propertyCounty");

  if (ga4City) result.oras = ga4City;
  if (ga4Area) result.cartier = ga4Area;
  if (ga4County) result.judet = ga4County;

  return Object.fromEntries(
    Object.entries(result).filter(([, v]) => v && v !== "not applicable")
  );
}

function firstGA4Value(html, key) {
  const match = html.match(new RegExp(`"${key}"\\s*:\\s*"([^"]+)"`));
  return match ? match[1].trim() : "";
}

// ---------------------------------------------------------------------------
// 5. Extrage descrierea anuntului
// ---------------------------------------------------------------------------
function extractDescription(html) {
  // Cauta in toate blocurile LD+JSON
  const ldBlocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)];

  for (const [, block] of ldBlocks) {
    try {
      const data = JSON.parse(block);
      const nodes = data["@graph"] ?? [data];
      for (const node of nodes) {
        const desc = node.description ?? "";
        if (desc.length > 200 && !desc.toLowerCase().includes("imobiliare.ro este")) {
          return desc.replace(/\\r\\n|\\n/g, "\n").trim();
        }
      }
    } catch {
      // continua cu urmatorul bloc
    }
  }

  // Fallback: cauta in variabilele JS inline
  const match = html.match(/"description"\s*:\s*"((?:[^"\\]|\\.){200,})"/);
  if (match) {
    return match[1]
      .replace(/\\r\\n|\\n/g, "\n")
      .replace(/\\"/g, '"')
      .trim();
  }

  return "";
}

// ---------------------------------------------------------------------------
// 6. Functia principala de scraping
// ---------------------------------------------------------------------------
/**
 * Parseaza un string HTML si returneaza datele imobiliare.
 * @param {string} html - Continutul HTML al paginii
 * @returns {Object} - { titlu, pret, pretPerMp, adresa, descriere }
 */
export function scrapeImobiliare(html) {
  const item = extractViewItem(html);
  const offer = extractOffer(html);
  const accommodation = extractAccommodation(html);
  const address = extractAddress(html);
  const description = extractDescription(html);

  // Pret
  const priceValue =
    offer.price ?? item.price ?? item.itemPrice ?? null;
  const currency = offer.priceCurrency ?? "EUR";
  const taxIncluded = offer.valueAddedTaxIncluded ?? true;

  // Suprafata
  let surface = accommodation.floorSize ?? item.propertySurface ?? null;
  if (surface === "not applicable") surface = null;

  // Pret/mp
  const pricePerSqm =
    priceValue && surface && surface > 0
      ? Math.round((priceValue / surface) * 100) / 100
      : null;

  return {
    titlu: item.item_name ?? "",
    pret: {
      valoare: priceValue,
      moneda: currency,
      tvaInclus: taxIncluded,
    },
    pretPerMp: {
      valoare: pricePerSqm,
      moneda: currency,
      suprafataMp: typeof surface === "number" ? surface : null,
    },
    adresa: address,
    descriere: description,
  };
}

// ---------------------------------------------------------------------------
// 7. Helper pentru File input din React
// ---------------------------------------------------------------------------
/**
 * Citeste un fisier .html incarcat de utilizator si returneaza datele.
 * @param {File} file - Fisierul HTML (din <input type="file">)
 * @returns {Promise<Object>}
 *
 * @example
 * const handleFileChange = async (e) => {
 *   const data = await scrapeImobiliareFromFile(e.target.files[0]);
 *   setPropertyData(data);
 * };
 */
export async function scrapeImobiliareFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(scrapeImobiliare(e.target.result));
    reader.onerror = () => reject(new Error("Nu s-a putut citi fisierul."));
    reader.readAsText(file, "utf-8");
  });
}

/**
 * Citeste un fisier .html de la un URL (CORS permis) si returneaza datele.
 * @param {string} url - URL-ul paginii
 * @returns {Promise<Object>}
 */
export async function scrapeImobiliareFromUrl(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const html = await res.text();
  return scrapeImobiliare(html);
}
