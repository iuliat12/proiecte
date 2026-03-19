import { Box, Container, Typography, Button } from "@mui/material";
import { InfoSection } from "./InfoSection";
import { Users, Target, Cog, ShieldCheck, Download } from "lucide-react";

export function Acasa() {
  /*
  const handleDownloadExtension = () => {
    const fileUrl = "/ScanARent_extension.zip";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "ScanARent_extension.zip");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };*/

  return (
    <Box sx={{ mt: 0, pt: 0 }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "primary.light",
          color: "white",
          py: 12,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 400,
              mb: 3,
            }}
          >
            Detectează Anunțurile False
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 200,
              mb: 4,
              opacity: 0.9,
            }}
          >
            Protejează-te de înșelătorii imobiliare cu ajutorul analizei inteligente
          </Typography>
          
          <Button
          variant="contained"
          size="large"
          startIcon={<Download size={20} />}
          component="a"
          href="/extension.zip"
          download="ScanARent_extension.zip"
          sx={{
            bgcolor: "secondary.main",
            color: "white",
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            textTransform: "none",
            fontWeight: 300,
            "&:hover": {
              bgcolor: "secondary.dark",
            },
          }}
        >
          Descarcă extensia .ZIP
        </Button>
        </Container>
      </Box>

      {/* Info Sections */}
      <InfoSection
        title="Cine suntem noi?"
        content="Suntem o echipă de studenți în anul 2 la UTCN, in cadrul Facultății de Automatică și Calculatoare, specializarea CTI. Am construit ScanARent din dorința de a rezolva o problemă reală cu care ne confruntăm noi și colegii noștri an de an: fraudele imobiliare la început de facultate. Echipa este formată din Ghib Denisa, Bulgaru Lara (pe partea de Frontend) și Moldovan Alex, Trifa Iulia (pe partea de Backend). Misiunea noastră e să facem căutarea unei chirii un proces sigur și fără stres."
        image="/IMG_7370.jpeg"
        icon={<Users size={40} />}
      />

      <InfoSection
        title="Care este obiectivul nostru?"
        content="Obiectivul ScanARent este simplu: zero avansuri pierdute pe anunțuri false. Vrem să devenim scutul digital al fiecărui student sau tânăr care își caută o chirie, înlocuind stresul de a verifica manual fiecare ofertă cu o analiză automată, bazată pe date. Viziunea noastră e simplă: să poți căuta o locuință online fără teama de a fi înșelat."
        reverse={true}
        icon={<Target size={40} />}
        bgcolor="background.paper"
      />

      <InfoSection
        title="Cum funcționează?"
        content="Uităm de copy-paste! ScanARent este o extensie de browser care te protejează direct pe site-urile de imobiliare pe care le folosești deja. Odată instalată, tot ce trebuie să faci când găsești un anunț interesant este să apeși butonul „Analizează cu Gemini”. Extensia extrage instantaneu datele din pagină și le trimite către inteligența artificială. AI-ul analizează prețul raportat la zonă, detectează anomaliile din descriere și caută tipare de fraudă. Fără zeci de tab-uri deschise, îți afișăm direct pe ecran un „Scor de Siguranță” detaliat. Un singur click și ești 100% protejat."
        icon={<Cog size={40} />}
      />

      <InfoSection
        title="De ce să ai încredere în noi?"
        content="Interesul nostru este 100% de partea ta, fiind o echipă independentă, fără afilieri sau comisioane ascunse. Folosim puterea AI-ului (Gemini) nu doar pentru a calcula un scor de risc, ci pentru a-ți explica clar fiecare „red flag” dintr-un anunț. În plus, îți garantăm confidențialitatea: extensia analizează strict datele publice ale ofertei, fără să-ți colecteze datele personale."
        reverse={true}
        icon={<ShieldCheck size={40} />}
        bgcolor="background.paper"
      />
    </Box>
  );
}