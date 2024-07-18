import React from "react";
import MainFeaturedPost from "../Components/MainFeaturedPost";
import { mainFeaturePost } from "../data";
import Featuredpet from "../Components/FeaturedPet";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllPets } from "../redux/actions/pets";

const HomePage = () => {
  const dispatch = useDispatch();

  const pets = useSelector((state) => state.pets.allPets);

  useEffect(() => {
    dispatch(fetchAllPets());
  }, [dispatch]);
  return (
    <>
      <MainFeaturedPost mainFeaturedPost={mainFeaturePost} />
      <Grid container spacing={4}>
        {pets.map((pet) => (
          <Featuredpet key={pet._id} pet={pet} />
        ))}
      </Grid>
    </>
  );
};
export default HomePage;
