import { createAdoptions } from "../../services/adoptions";
import { SET_ADOPTION_LOADER } from "../actionTypes/adoptions";
import { showSnackbar } from "./snackebar";

export const createAdoption = (payload) => async (dispatch) => {
  dispatch({
    type: SET_ADOPTION_LOADER,
    payload: true,
  });
  try {
    await createAdoptions(payload);
    dispatch(
      showSnackbar({
        message: "Adoption requested",
        type: "success",
      })
    );
    dispatch({
      type: SET_ADOPTION_LOADER,
      payload: false,
    });
  } catch (err) {
    console.error("Error in createAdoption:", err);
    dispatch(
      showSnackbar({
        message: "Error occurred!",
        type: "error",
      })
    );
    dispatch({
      type: SET_ADOPTION_LOADER,
      payload: false,
    });
  }
};
