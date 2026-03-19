// content.js - extrage datele din pagina curentă
function scrapeImobiliare() {
  const html = document.documentElement.innerHTML;

  // Pret din schema.org Offer
  const offerMatch = html.match(/"@type"\s*:\s*"Offer".*?"priceSpecification"\s*:\s*(\{[^}]+\})/s);
  const offer = offerMatch ? JSON.parse(offerMatch[1]) : {};

  // Date principale din GA4 view_item
  const itemMatch = html.match(/"event"\s*:\s*"view_item".*?"items"\s*:\s*(\[.*?\])\s*\}/s);
  const item = itemMatch ? JSON.parse(itemMatch[1])[0] : {};

  // Suprafata
  const accMatch = html.match(/"floorSize"\s*:\s*(\d+)/);
  const surface = accMatch ? parseInt(accMatch[1]) : (item.propertySurface || null);

  // Pret/mp
  const price = offer.price || item.price || null;
  const pricePerSqm = price && surface ? Math.round(price / surface) : null;

  // Adresa
  const cartier = (html.match(/"propertyArea"\s*:\s*"([^"]+)"/) || [])[1] || "";
  const oras    = (html.match(/"propertyCity"\s*:\s*"([^"]+)"/)  || [])[1] || "";
  const judet   = (html.match(/"propertyCounty"\s*:\s*"([^"]+)"/)|| [])[1] || "";

  // Descriere din LD+JSON
  let descriere = "";
  const ldBlocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)];
  for (const [, block] of ldBlocks) {
    try {
      const nodes = (JSON.parse(block)["@graph"] || []);
      for (const node of nodes) {
        if (node.description?.length > 200 && !node.description.includes("imobiliare.ro este")) {
          descriere = node.description.replace(/\\r\\n|\\n/g, "\n").trim();
          break;
        }
      }
    } catch {}
    if (descriere) break;
  }

  return {
    titlu: item.item_name || document.title || "",
    pret: price,
    moneda: offer.priceCurrency || "EUR",
    pretPerMp: pricePerSqm,
    suprafata: surface,
    adresa: [cartier, oras, judet].filter(Boolean).join(", "),
    descriere,
  };
}

// Trimite datele la service worker când e cerut
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === "EXTRAGE_DATELE") {
    sendResponse({ date: scrapeImobiliare() });
  }
});