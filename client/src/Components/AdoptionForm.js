import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAdoption } from "../redux/actions/adoptions";
import { useDispatch } from "react-redux";

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    address: yup.string().required(),
    email: yup.string().required().email("Please enter a valid email"),
    phone: yup.number().positive().integer().required(),
  })
  .required();

const AdoptionForm = ({ closeModel }) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(createAdoption(data));
    closeModel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="firstName">First Name</InputLabel>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <OutlinedInput
              error={Boolean(errors.firstName)}
              id="firstName"
              label="First Name"
              {...field}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="lastName">Last Name</InputLabel>
        <Controller
          name="lastName"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <OutlinedInput
              error={Boolean(errors.lastName)}
              id="lastName"
              label="Last Name"
              {...field}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <OutlinedInput
              error={Boolean(errors.email)}
              id="email"
              label="Email"
              {...field}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="phone">Phone</InputLabel>
        <Controller
          name="phone"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <OutlinedInput
              error={Boolean(errors.phone)}
              id="phone"
              label="Phone"
              {...field}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="address">Address</InputLabel>
        <Controller
          name="address"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <OutlinedInput
              error={Boolean(errors.address)}
              id="address"
              label="Address"
              {...field}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <Button variant="contained" color="success" type="submit">
          Adopt
        </Button>
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "gray",
            "&:hover": { backgroundColor: "darkgray" },
          }}
          onClick={closeModel}
        >
          Cancel
        </Button>
      </FormControl>
    </form>
  );
};

export default AdoptionForm;
