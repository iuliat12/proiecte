import { Box, Container, Typography, Grid, Divider } from "@mui/material";
import { Mail, Github } from "lucide-react"; // Am scos ShieldAlert
import { useTheme } from "@mui/material/styles";
import { Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

export function Footer() {
    const theme = useTheme();
    
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.primary.main,
        borderTop: "1px solid",
        borderColor: "divider",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            {/* Înlocuit ShieldAlert cu logo.png */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <img 
                src="/logo.png" 
                alt="Logo" 
                style={{ height: "32px", width: "auto" }} 
              />
              <Typography variant="h6" color="background.paper" sx={{ fontWeight: 600 }}>
                ScanARent
              </Typography>
            </Box>
            <Typography variant="body2" color="background.paper" sx={{ maxWidth: 300, opacity: 0.8, fontWeight: 200 }}>
              Analizăm anunțuri pentru a detecta potențiale înșelătorii și spam. 
              Protejează-te împotriva fraudelor online.
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" color="background.paper" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Navigare
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <MuiLink
                component={Link}
                to="/"
                underline="hover"
                color="background.paper"
                sx={{ fontSize: "0.9rem", fontWeight: 200 }}
              >
                Acasă
              </MuiLink>
              
              <MuiLink
                component={Link}
                to="/istoric"
                underline="hover"
                color="background.paper"
                sx={{ fontSize: "0.9rem", fontWeight: 200 }}
              >
                Istoric
              </MuiLink>

              <MuiLink
                component={Link}
                to="/clasament"
                underline="hover"
                color="background.paper"
                sx={{ fontSize: "0.9rem", fontWeight: 200 }}
              >
                Clasament
              </MuiLink>
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" color="background.paper" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Contact
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Mail size={18} color="white" />
                <MuiLink
                  href="mailto:contact@scanarent.ro"
                  underline="hover"
                  color="background.paper"
                  sx={{ fontSize: "0.9rem", fontWeight: 200 }}
                >
                  contact@scanarent.ro
                </MuiLink>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Github size={18} color="white" />
                <MuiLink
                  href="#"
                  underline="hover"
                  color="background.paper"
                  sx={{ fontSize: "0.9rem", fontWeight: 200 }}
                >
                  GitHub
                </MuiLink>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.1)" }} />
        
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body2" color="background.paper" sx={{ fontWeight: 200, opacity: 0.6 }}>
            © {new Date().getFullYear()} ScanARent. Toate drepturile rezervate.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}