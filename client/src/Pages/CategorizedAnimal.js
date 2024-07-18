// components/CategorizedAnimal.js
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPetsByCategory } from "../redux/actions/pets";
import { Grid } from "@mui/material";
import Featuredpet from "../Components/FeaturedPet";

const CategorizedAnimal = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const petsByCategory = useSelector((state) => state.pets.petsByCategory);

  useEffect(() => {
    console.log(`Dispatching fetchPetsByCategory for category: ${category}`); // Debugging log
    dispatch(fetchPetsByCategory(category));
  }, [category, dispatch]);

  console.log("petsByCategory state:", petsByCategory); // Debugging log

  return (
    <Grid container spacing={4}>
      {petsByCategory?.map((pet, index) => (
        <Featuredpet key={index} pet={pet} />
      ))}
    </Grid>
  );
};

export default CategorizedAnimal;
