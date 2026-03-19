import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Menu, MenuItem } from "@mui/material";
import { Home, History, Trophy, Menu as MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" elevation={2} sx={{ bgcolor: "primary.main" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          
          {/* Logo-ul din folderul public */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              mr: 2
            }}
          >
            <img 
              src="/logo.png" 
              alt="ScanARent Logo" 
              style={{ 
                height: "40px", // Ajustează înălțimea după cum arată bine logo-ul tău
                width: "auto",
                display: "block"
              }} 
            />
          </Box>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 400,
              letterSpacing: "0.5px",
              color: "white",
            }}
          >
            ScanARent
          </Typography>
          
          {/* ----- ZONA DESKTOP ----- */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <Button component={Link} 
                to="/" 
                color="inherit" startIcon={<Home size={18} />} sx={{ textTransform: "none", fontWeight: 200, fontSize: "1rem", color: "white" }}>
              Acasă
            </Button>
            <Button component={Link} 
                to="/istoric" 
                color="inherit" startIcon={<History size={18} />} sx={{ textTransform: "none", fontWeight: 200, fontSize: "1rem", color: "white" }}>
              Istoric
            </Button>
            <Button component={Link} 
                to="/clasament" 
                color="inherit" startIcon={<Trophy size={18} />} sx={{ textTransform: "none", fontWeight: 200, fontSize: "1rem", color: "white" }}>
              Clasament
            </Button>
          </Box>

          {/* ----- ZONA MOBIL ----- */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon color="white" />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>
                <Home size={18} style={{ marginRight: "10px" }} />
                <Typography textAlign="center">Acasă</Typography>
              </MenuItem>
              <MenuItem component={Link} to="/istoric" onClick={handleCloseNavMenu}>
                <History size={18} style={{ marginRight: "10px" }} />
                <Typography textAlign="center">Istoric</Typography>
              </MenuItem>
              <MenuItem component={Link} to="/clasament" onClick={handleCloseNavMenu}>
                <Trophy size={18} style={{ marginRight: "10px" }} />
                <Typography textAlign="center">Clasament</Typography>
              </MenuItem>
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}