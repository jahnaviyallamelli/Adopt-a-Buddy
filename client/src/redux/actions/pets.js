import { getAllPets, getPetById, getPetsByCategory } from "../../services/Pets";
import {
  GET_ALL_PETS,
  GET_PET_BY_ID,
  GET_PETS_BY_CATEGORY,
} from "../actionTypes/pets";

export const fetchAllPets = () => async (dispatch) => {
  try {
    const response = await getAllPets();
    console.log("fetchAllPets response:", response.data); // Debugging log
    dispatch({
      type: GET_ALL_PETS,
      payload: response.data.data, // Ensure this structure matches your API response
    });
  } catch (err) {
    console.error("Error in fetchAllPets:", err);
    dispatch({
      type: GET_ALL_PETS,
      payload: [],
    });
  }
};

export const fetchPetsByCategory = (category) => async (dispatch) => {
  try {
    const response = await getPetsByCategory({ category });
    console.log("fetchPetsByCategory response:", response.data); // Debugging log
    dispatch({
      type: GET_PETS_BY_CATEGORY,
      payload: response.data, // Ensure this structure matches your API response
    });
  } catch (error) {
    console.error("Error in fetchPetsByCategory:", error.message);
    dispatch({
      type: GET_PETS_BY_CATEGORY,
      payload: [], // Handle error by dispatching an empty array
    });
  }
};

export const fetchPetById = (id) => async (dispatch) => {
  try {
    const response = await getPetById({ id });
    console.log("fetchPetById response:", response.data); // Debugging log
    dispatch({
      type: GET_PET_BY_ID,
      payload: response.data.data,
    });
  } catch (err) {
    console.error("Error in fetchPetById:", err);
    dispatch({
      type: GET_PET_BY_ID,
      payload: null,
    });
  }
};
