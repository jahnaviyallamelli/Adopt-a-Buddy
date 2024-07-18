import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, CssBaseline, Grid } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Components/Header";
import Router from "./router";
import Footer from "./Components/Footer";
import { fetchAllCategories } from "./redux/actions/categories";
import "./App.css";
import SnackbarComponent from "./Components/SnackbarComponent";

const sections = [{ title: "All Pets", url: "/" }];

const theme = createTheme({
  fontFamily: `"Trebucket MS","Helvetica","Arial", sans-serif`,
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
});

function App() {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories.allCategories);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header
            allCategories={[
              ...sections,
              ...allCategories.map((category) => ({
                title: category?.name,
                url: `/${category?._id}`,
              })),
            ]}
          />
          <SnackbarComponent />
          <Router />
        </Container>
        <Footer
          title="Pet Adoption Center"
          description="Every Pet Deserves a good home"
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
