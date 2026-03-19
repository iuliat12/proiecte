import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "../shared/theme";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Acasa } from "./Acasa";
import Istoric from "./Istoric";
import { Clasament }  from "./Clasament"; 

const Login = () => <Box sx={{ p: 5 }}><h1>Pagina Log In</h1></Box>;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          
          <Navbar /> 

          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Acasa />} />
              <Route path="/istoric" element={<Istoric />} />
              
              {/* 2. Înlocuim placeholder-ul cu componenta reală */}
              <Route path="/clasament" element={<Clasament />} />
              
              <Route path="/login" element={<Login />} />
            </Routes>
          </Box>
          
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}