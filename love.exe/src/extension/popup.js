document.getElementById("checkBtn").addEventListener("click", async () => {
    const loader = document.getElementById("loader");
    const resultDiv = document.getElementById("result");
    const btn = document.getElementById("checkBtn");

    btn.style.display = "none";
    loader.style.display = "block";
    resultDiv.style.display = "none";

    try {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        if (!tab || !tab.id) {
            throw new Error("Nu am putut gasi tab-ul activ.");
        }

        console.log("Tab-ul curent este:", tab.url); 

       
        chrome.tabs.sendMessage(tab.id, { action: "EXTRAGE_DATELE" }, (response) => {
            console.log("Raspuns primit de la content.js:", response);

            
            if (chrome.runtime.lastError) {
                console.error("Eroare de comunicare:", chrome.runtime.lastError.message);
                afiseazaEroare("Nu pot comunica cu pagina. Ai dat refresh la pagina anuntului după ce ai updatat extensia?");
                return;
            }

            
            if (!response || !response.date) {
                afiseazaEroare("Nu am putut extrage datele. Extensia rulează, dar nu a găsit titlul pe această pagină. Probabil nu e un anunt.");
                return;
            }

            
            chrome.runtime.sendMessage({ type: "ANALYZE_SCAM", data: response.date }, (aiResponse) => {
                console.log("Raspuns primit de la Gemini:", aiResponse);

                loader.style.display = "none";
                resultDiv.style.display = "block";
                btn.style.display = "block";

                if (aiResponse) {
                    let culoareBg = aiResponse.score > 60 ? "#f44336" : (aiResponse.score > 30 ? "#ff9800" : "#4caf50");
                    resultDiv.style.backgroundColor = culoareBg;
                    resultDiv.style.color = "white";
                    resultDiv.innerHTML = `
                        <h2 style="margin: 0 0 5px 0;">Risc: ${aiResponse.score}%</h2>
                        <p style="margin: 0; font-size: 13px;">${aiResponse.reason}</p>
                    `;
                    resultDiv.innerHTML += '<a href="https://scanarent.vercel.app/" target="_blank" style="display: block; margin-top: 10px; color: white; text-decoration: underline; font-weight: bold; text-align: center;">Acceseaza site-ul pentru mai multe detalii</a>';
                } else {
                    afiseazaEroare("Gemini nu a returnat un raspuns.");
                }
            });
        });

    } catch (error) {
        console.error("A apărut o eroare:", error);
        afiseazaEroare(error.message);
    }

   
    function afiseazaEroare(mesaj) {
        loader.style.display = "none";
        resultDiv.style.display = "block";
        resultDiv.style.backgroundColor = "#f8d7da";
        resultDiv.style.color = "#721c24";
        resultDiv.innerHTML = "x " + mesaj;
        btn.style.display = "block";
    }
});