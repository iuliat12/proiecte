import { GEMINI_API_KEY } from './api.js';

async function cheamaGemini(adData, phoneNumber) {
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;

    const prompt = `Ești un expert în detectarea fraudelor imobiliare din România. 
    Analizează acest anunț și calculează probabilitatea ca el să fie un SCAM (0 = sigur, 100 = țeapă clară).
    Fii atent la semnalele de alarmă: 
    - Preț nerealist de mic per metru patrat comparativ cu piața. (10 puncte per 20% sub media zonei)
    - Descrieri foarte vagi, traduse prost.(20 puncte)
    - Promisiuni exagerate. (10 puncte)
    - Nu te cheamă direct la vizionare, ci te cheamă mai întâi la o agenție fantomă.(10 puncte)
    - Poze care par prea bune pentru a fi adevărate sau care sunt preluate de pe alte site-uri.(5 puncte)
    - Cere taxă ca să-ți prezinte proprietatea sau să-ți dea mai multe detalii.(20 de puncte)
    - Contact (20 puncte): Dacă anunțul evită să ofere un număr de telefon, cere contact doar pe WhatsApp sau nu exista niciun buton pe care sa pot apasa sa vad numarul de telefon, adauga 20 de puncte. In cazul in care site-ul ascunde numarul de telefon, dar exista un buton pe care pot sa apas ca sa vad numarul de telefon nu adauga puncte.

    {
        titlu: "${adData.titlu || 'Necunoscut'}",
        pret: "${adData.pret ? `${adData.pret} ${adData.moneda}` : 'Necunoscut'}",
        pretPerMp: "${adData.pretPerMp ? `${adData.pretPerMp} ${adData.moneda}/mp` : 'Necunoscut'}",
        suprafata: "${adData.suprafata ? `${adData.suprafata} mp` : 'Necunoscută'}",
        adresa: "${adData.adresa || 'Necunoscută'}",
        descriere: "${(adData.descriere || 'Fără descriere').replace(/"/g, "'").replace(/\n/g, ' ')}"
    }

    Răspunde STRICT în acest format, pe două rânduri, FĂRĂ alte caractere sau steluțe (fără bold):
    SCOR: [număr între 0 și 100]
    MOTIV: [1-2 propoziții scurte care justifică scorul]`;

    try {
        const res = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": GEMINI_API_KEY
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.1,
                    topP: 0.1
                }
            })
        });

        const data = await res.json();

        if (!res.ok || data.error) {
            console.error("Eroare API Gemini:", data.error);
            return { score: 0, reason: "Eroare de la serverul AI. Verifică consola Service Worker." };
        }

        const output = data.candidates[0].content.parts[0].text;
        console.log("Ce a răspuns Gemini:", output);

        const matchScor = output.match(/SCOR:\s*(\d+)/i);
        const score = matchScor ? parseInt(matchScor[1]) : 0;

        const parts = output.split(/MOTIV:/i);
        const reason = parts[1]
            ? parts[1].replace(/\*/g, '').trim()
            : "Analiză completă, dar nu am putut citi motivul.";

        return { score, reason };
    } catch (e) {
        console.error("Eroare conexiune:", e);
        return { score: 0, reason: "Nu m-am putut conecta la AI. Verifică netul sau codul." };
    }
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.type === "ANALYZE_SCAM") {
        cheamaGemini(req.data)
            .then(sendResponse)
            .catch(() => sendResponse({ score: 0, reason: "Eroare critică la rulare." }));
        return true;
    }
});