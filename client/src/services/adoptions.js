import axiosInstance from "./axiosInstance";

export const createAdoptions = (payload) => {
  return axiosInstance.post("/adoption/create", payload);
};
