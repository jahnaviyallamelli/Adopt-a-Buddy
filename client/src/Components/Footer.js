import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const Copyright = () => {
  return (
    <Typography variant="body2" align="center" color="text.secondary">
      {"copyright ©"}
      Adopt a Buddy
      {new Date().getFullYear()}
    </Typography>
  );
};

const Footer = ({ title, description }) => {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          component="p"
          color="text.secondary"
        >
          {description}
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;
