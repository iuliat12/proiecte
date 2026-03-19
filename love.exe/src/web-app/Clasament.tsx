import { Box, Container, Typography, Card, CardContent, CardMedia, Chip, Grid } from "@mui/material";
import { MapPin, Home as HomeIcon, Award, TrendingUp, Star, Medal, Crown, CheckCircle, AlertCircle, XCircle, DollarSign } from "lucide-react";
import listingsData from "./listings.json";

// Interfața pentru obiectul final folosit în UI
interface Listing {
  id: number;
  url: string;
  title: string;
  location: string;
  price: string;
  surface: string;
  rooms: number;
  description: string;
  image: string;
  fraudScore: number;
  fraudReason: string;
  checkedDate: string;
}

interface RawJSONListing {
  id: number;
  url: string;
  title: string;
  location: string;
  price: string;
  surface?: string;
  rooms?: number;
  description: string;
  image: string;
  scamProbability?: number;
  fraudScore?: number;
  reasons?: string[];
  dateAnalyzed?: string;
}

export function Clasament() {
  // Funcție de curățare preț (funcționează și pentru "150 EUR/lună" și pentru "85,000 EUR")
  const extractPrice = (priceString: string): number => {
    const cleanString = priceString.replace(/[^\d]/g, '');
    return parseInt(cleanString) || 0;
  };

  const normalizedListings: Listing[] = (listingsData as RawJSONListing[]).map(item => ({
    id: item.id,
    url: item.url,
    title: item.title,
    location: item.location,
    price: item.price,
    surface: item.surface || "N/A",
    rooms: item.rooms || 0,
    description: item.description,
    image: item.image,
    fraudScore: item.scamProbability !== undefined ? item.scamProbability : (item.fraudScore || 0),
    fraudReason: Array.isArray(item.reasons) ? item.reasons.join(". ") : "",
    checkedDate: item.dateAnalyzed || new Date().toISOString()
  }));

  // Sortare: cele mai sigure (fraudScore mic) primele
  const sortedListings = [...normalizedListings].sort((a, b) => {
    if (a.fraudScore !== b.fraudScore) {
      return a.fraudScore - b.fraudScore;
    }
    return extractPrice(a.price) - extractPrice(b.price);
  });

  const getPodiumStyle = (index: number) => {
    switch (index) {
      case 0: return { gradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)", icon: <Crown size={20} />, borderColor: "#FFD700" };
      case 1: return { gradient: "linear-gradient(135deg, #C0C0C0 0%, #808080 100%)", icon: <Medal size={20} />, borderColor: "#C0C0C0" };
      case 2: return { gradient: "linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)", icon: <Star size={20} />, borderColor: "#CD7F32" };
      default: return { gradient: "linear-gradient(135deg, #496567 0%, #314a4c 100%)", icon: <Award size={20} />, borderColor: "#e0e0e0" };
    }
  };

  const getScoreInfo = (score: number) => {
    if (score < 30) return { icon: <CheckCircle size={18} />, color: "#4caf50", bgColor: "#e8f5e9", label: "Sigur" };
    if (score < 60) return { icon: <AlertCircle size={18} />, color: "#ff9800", bgColor: "#fff3e0", label: "Atenție" };
    return { icon: <XCircle size={18} />, color: "#f44336", bgColor: "#ffebee", label: "Risc" };
  };

  return (
    <Box sx={{ bgcolor: "#fbfcfc", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5, color: "#496567" }}>
            Best Choices
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 300 }}>
            🏆 Topul celor mai sigure anunțuri verificate de comunitate
          </Typography>
        </Box>

        {/* Grid cu centrare pentru ultimul rând */}
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {sortedListings.map((listing, index) => {
            const podium = getPodiumStyle(index);
            const scoreInfo = getScoreInfo(listing.fraudScore);
            const safetyScore = 100 - listing.fraudScore;

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={listing.id} sx={{ display: 'flex' }}>
                <Card sx={{
                  width: '100%',
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  border: `1px solid ${index < 3 ? podium.borderColor : "#f0f0f0"}`,
                  boxShadow: index < 3 ? "0 12px 24px rgba(0,0,0,0.08)" : "0 4px 12px rgba(0,0,0,0.03)",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": { transform: "translateY(-5px)" }
                }}>
                  {/* Container Imagine Landscape */}
                  <Box sx={{ position: "relative", pt: "66%" }}>
                    <CardMedia
                      component="img"
                      image={listing.image}
                      sx={{ position: "absolute", top: 0, height: "100%", width: "100%", objectFit: "cover" }}
                    />
                    {/* Badge Loc Clasament */}
                    <Box sx={{ 
                      position: "absolute", top: 12, left: 12, 
                      background: podium.gradient, 
                      width: 36, height: 36, 
                      borderRadius: "50%", display: "flex", 
                      alignItems: "center", justifyContent: "center", 
                      color: "white", border: "2px solid white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                    }}>
                       {index < 3 ? podium.icon : <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{index + 1}</Typography>}
                    </Box>
                    {/* Badge Preț */}
                    <Box sx={{ 
                      position: "absolute", bottom: 12, right: 12, 
                      bgcolor: "rgba(255, 255, 255, 0.95)", 
                      color: "#496567", px: 1.2, py: 0.4, 
                      borderRadius: 1.5, display: "flex", 
                      alignItems: "center", gap: 0.5,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}>
                      <DollarSign size={14} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{listing.price}</Typography>
                    </Box>
                  </Box>

                  <CardContent sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Typography 
                      variant="subtitle1" 
                      component="a" 
                      href={listing.url} 
                      target="_blank" 
                      sx={{ 
                        fontWeight: 700, mb: 1, 
                        textDecoration: "none", color: "#2c3e50", 
                        display: "-webkit-box", WebkitLineClamp: 2, 
                        WebkitBoxOrient: "vertical", overflow: "hidden", 
                        minHeight: "2.8rem", lineHeight: 1.4,
                        "&:hover": { color: "#496567" }
                      }}
                    >
                      {listing.title}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <Chip 
                        icon={<MapPin size={12} />} 
                        label={listing.location} 
                        size="small" 
                        sx={{ bgcolor: "#f1f2f6", fontSize: "0.75rem" }} 
                      />
                      <Chip 
                        icon={<HomeIcon size={12} />} 
                        label={`${listing.rooms} Cam`} 
                        size="small" 
                        variant="outlined"
                        sx={{ fontSize: "0.75rem" }} 
                      />
                    </Box>

                    {/* Secțiune Scor și Siguranță */}
                    <Box sx={{ 
                      mt: "auto", pt: 2, 
                      borderTop: "1px solid #f1f2f6", 
                      display: "flex", alignItems: "center", 
                      justifyContent: "space-between" 
                    }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                        <Box sx={{ color: scoreInfo.color, display: "flex" }}>{scoreInfo.icon}</Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: scoreInfo.color, textTransform: "uppercase" }}>
                          {scoreInfo.label}
                        </Typography>
                      </Box>
                      <Box sx={{ 
                        bgcolor: scoreInfo.bgColor, 
                        px: 1.5, py: 0.5, 
                        borderRadius: 2, 
                        display: "flex", alignItems: "center", gap: 0.5 
                      }}>
                        <TrendingUp size={14} color={scoreInfo.color} />
                        <Typography variant="body2" sx={{ fontWeight: 900, color: scoreInfo.color }}>
                          {safetyScore}%
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}