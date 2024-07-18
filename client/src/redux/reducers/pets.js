import {
  GET_ALL_PETS,
  GET_PET_BY_ID,
  GET_PETS_BY_CATEGORY,
} from "../actionTypes/pets";

const initialState = {
  allPets: [],
  petsByCategory: [],
  selectedPet: {},
};

const petsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_PETS:
      return {
        ...state,
        allPets: payload,
      };
    case GET_PETS_BY_CATEGORY:
      console.log("Updating state with pets by category:", payload); // Debugging log
      return {
        ...state,
        petsByCategory: payload,
      };
    case GET_PET_BY_ID:
      return {
        ...state,
        selectedPet: payload,
      };
    default:
      return state;
  }
};
export default petsReducer;
