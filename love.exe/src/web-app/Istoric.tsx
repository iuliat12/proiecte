import React from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Link,
  Stack,
  Alert,
  CardMedia,
} from '@mui/material';
import {
  CheckCircleOutline,
  WarningAmber,
  DangerousOutlined,
  OpenInNew,
  CalendarToday,
} from '@mui/icons-material';
import listingsData from './listings.json';

interface Listing {
  id: number;
  title: string;
  url: string;
  platform: string;
  price: string;
  location: string;
  image: string;
  description: string;
  scamProbability: number;
  riskLevel: 'scăzut' | 'mediu' | 'ridicat';
  reasons: string[];
  dateAnalyzed: string;
}

const Istoric: React.FC = () => {
  const listings = listingsData as Listing[];

  const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'scăzut':
      return {
        primary: '#4caf50',
        light: '#e8f5e9',
        dark: '#2e7d32',
      };
    case 'mediu':
      return {
        primary: '#ff9800',
        light: '#fff3e0',
        dark: '#e65100',
      };
    case 'ridicat':
      return {
        primary: '#f44336',
        light: '#ffebee',
        dark: '#c62828',
      };
    default:
      return {
        primary: '#9e9e9e',
        light: '#f5f5f5',
        dark: '#616161',
      };
  }
};

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'scăzut':
        return <CheckCircleOutline sx={{ fontSize: 28 }} />;
      case 'mediu':
        return <WarningAmber sx={{ fontSize: 28 }} />;
      case 'ridicat':
        return <DangerousOutlined sx={{ fontSize: 28 }} />;
      default:
        return null;
    }
  };

  const getRiskLabel = (riskLevel: string) => {
    switch (riskLevel) {
      case 'scăzut':
        return 'Risc Scăzut';
      case 'mediu':
        return 'Risc Mediu';
      case 'ridicat':
        return 'Risc Ridicat';
      default:
        return 'Necunoscut';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 300,
              color: '#496567',
              mb: 2,
            }}
          >
            Istoric Anunțuri Analizate
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.1rem',
              color: '#555555',
              maxWidth: '700px',
              mx: 'auto',
            }}
          >
            Vizualizează toate anunțurile analizate și probabilitatea ca acestea să fie
            frauduloase
          </Typography>
        </Box>

        {/* Listings */}
        <Stack spacing={3}>
          {listings.map((listing) => {
            const colors = getRiskColor(listing.riskLevel);

            return (
              <Card
                key={listing.id}
                sx={{
                  borderLeft: `6px solid ${colors.primary}`,
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                  {/* Image */}
                  <CardMedia
                    component="img"
                    sx={{
                      width: { xs: '100%', md: 280 },
                      height: { xs: 200, md: 'auto' },
                      objectFit: 'cover',
                    }}
                    image={listing.image}
                    alt={listing.title}
                  />

                  {/* Content */}
                  <CardContent sx={{ flex: 1 }}>
                    {/* Title and Risk Badge */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 2,
                        flexWrap: 'wrap',
                        gap: 2,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h2"
                          sx={{
                            fontSize: '1.5rem',
                            fontWeight: 400,
                            color: '#222',
                            mb: 1,
                          }}
                        >
                          {listing.title}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                          <Chip
                            label={listing.platform}
                            size="small"
                            sx={{
                              backgroundColor: '#496567',
                              color: 'white',
                              fontWeight: 500,
                            }}
                          />
                          <Chip
                            label={listing.location}
                            size="small"
                            variant="outlined"
                            sx={{ borderColor: '#496567', color: '#496567' }}
                          />
                          <Chip
                            label={listing.price}
                            size="small"
                            variant="outlined"
                            sx={{ borderColor: '#674b49', color: '#674b49', fontWeight: 600 }}
                          />
                        </Stack>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          backgroundColor: colors.light,
                          px: 2,
                          py: 1.5,
                          borderRadius: 2,
                          border: `2px solid ${colors.primary}`,
                        }}
                      >
                        <Box sx={{ color: colors.dark }}>{getRiskIcon(listing.riskLevel)}</Box>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: '0.75rem', color: '#555', lineHeight: 1 }}
                          >
                            {getRiskLabel(listing.riskLevel)}
                          </Typography>
                          <Typography
                            variant="h3"
                            sx={{
                              fontSize: '1.8rem',
                              fontWeight: 600,
                              color: colors.dark,
                              lineHeight: 1.2,
                            }}
                          >
                            {listing.scamProbability}%
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* Probability Bar */}
                    <Box sx={{ mb: 3 }}>
                      <LinearProgress
                        variant="determinate"
                        value={listing.scamProbability}
                        sx={{
                          height: 12,
                          borderRadius: 6,
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: colors.primary,
                            borderRadius: 6,
                          },
                        }}
                      />
                    </Box>

                    {/* Description */}
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 2,
                        color: '#333',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        backgroundColor: '#f9f9f9',
                        p: 2,
                        borderRadius: 1,
                        fontStyle: 'italic',
                      }}
                    >
                      "{listing.description}"
                    </Typography>

                    {/* Reasons */}
                    <Alert
                      severity={
                        listing.riskLevel === 'scăzut'
                          ? 'success'
                          : listing.riskLevel === 'mediu'
                          ? 'warning'
                          : 'error'
                      }
                      sx={{ mb: 2 }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 1, fontSize: '0.9rem' }}
                      >
                        Motivele analizei:
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, m: 0 }}>
                        {listing.reasons.map((reason, index) => (
                          <li key={index}>
                            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                              {reason}
                            </Typography>
                          </li>
                        ))}
                      </Box>
                    </Alert>

                    {/* Footer */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pt: 2,
                        borderTop: '1px solid #e0e0e0',
                        flexWrap: 'wrap',
                        gap: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarToday sx={{ fontSize: 16, color: '#888' }} />
                        <Typography variant="body2" sx={{ color: '#888', fontSize: '0.85rem' }}>
                          Analizat: {formatDate(listing.dateAnalyzed)}
                        </Typography>
                      </Box>

                      <Link
                        href={listing.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          color: '#496567',
                          textDecoration: 'none',
                          fontWeight: 500,
                          fontSize: '0.9rem',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        Vezi anunțul original
                        <OpenInNew sx={{ fontSize: 16 }} />
                      </Link>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
};

export default Istoric;