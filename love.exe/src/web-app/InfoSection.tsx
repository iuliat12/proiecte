import { Box, Container, Typography, Paper } from "@mui/material";
import { ReactNode } from "react";

interface InfoSectionProps {
  title: string;
  content: string;
  image?: string;
  icon?: ReactNode;
  reverse?: boolean;
  bgcolor?: string;
}

export function InfoSection({ 
  title, 
  content, 
  image, 
  icon, 
  reverse = false,
  bgcolor = "transparent"
}: InfoSectionProps) {
  return (
    <Box sx={{ bgcolor, py: 8 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: reverse ? "row-reverse" : "row" },
            gap: 6,
            alignItems: "center",
          }}
        >
          {/* Text Content */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              {icon && (
                <Box sx={{ color: "primary.main" }}>
                  {icon}
                </Box>
              )}
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 400,
                  color: "primary.main",
                }}
              >
                {title}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                fontWeight: 200,
              }}
            >
              {content}
            </Typography>
          </Box>

          {/* Image */}
          {image && (
            <Box sx={{ flex: 1, maxWidth: { xs: "100%", md: "50%" } }}>
              <Paper
                elevation={3}
                sx={{
                  overflow: "hidden",
                  borderRadius: 2,
                  aspectRatio: "16/10",
                }}
              >
                <img
                  src={image}
                  alt={title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Paper>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
