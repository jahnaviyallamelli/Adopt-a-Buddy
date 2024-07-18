import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link, Toolbar, Typography, useTheme } from "@mui/material";
import "../App.css";

const Header = ({ allCategories }) => {
  const location = useLocation();
  const theme = useTheme();

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          sx={{ flex: 1 }}
        >
          <img src="/img/logo.jpg" width="180" alt="Logo" />
        </Typography>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {allCategories?.map((category) => (
          <Link
            key={category.url}
            component={RouterLink}
            to={category.url}
            sx={{
              padding: "0 16px",
              textDecoration: "none",
              color:
                location.pathname === category.url
                  ? "inherit"
                  : theme.palette.primary.main, // Use primary color for active link
            }}
          >
            {category.title}
          </Link>
        ))}
      </Toolbar>
    </>
  );
};

export default Header;
