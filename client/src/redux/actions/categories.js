import { getAllCategories } from "../../services/categories";
import { GET_ALL_CATEGORIES } from "../actionTypes/categories";

export const fetchAllCategories = () => async (dispatch) => {
  try {
    const response = await getAllCategories();
    dispatch({
      type: GET_ALL_CATEGORIES,
      payload: response.data.data, // Extracting data from response
    });
  } catch (err) {
    console.error("Error in fetchAllCategories:", err);
    dispatch({
      type: GET_ALL_CATEGORIES,
      payload: [],
    });
  }
};
