import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPetById } from "../redux/actions/pets";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import {
  Box,
  Button,
  Grid,
  ImageList,
  ImageListItem,
  Modal,
  Typography,
} from "@mui/material";
import { BACKEND_URI } from "../utils/constants";
import AdoptionForm from "../Components/AdoptionForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "background.paper",
  boxShadow: 24,
  pt: 2,
  pz: 4,
  pb: 3,
  padding: 3,
};

const PetProfilePage = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams(); // Ensure id is correctly retrieved from URL
  const dispatch = useDispatch();
  const selectedPet = useSelector((state) => state.pets.selectedPet);

  useEffect(() => {
    if (id) {
      // Check if id exists before dispatching
      dispatch(fetchPetById(id));
    }
  }, [id, dispatch]);

  const images = useMemo(
    () =>
      selectedPet?.additionalImages
        ? [
            BACKEND_URI + "/" + selectedPet?.image,
            ...selectedPet?.additionalImages.map(
              (image) => BACKEND_URI + "/" + image
            ),
          ]
        : [BACKEND_URI + "/" + selectedPet?.image],
    [selectedPet]
  );

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <ImageList sx={{ height: 610 }} variant="woven" cols={3} gap={8}>
          {images?.map((item, index) => (
            <ImageListItem key={index}>
              <Zoom>
                <img
                  key={index}
                  src={item}
                  alt={`Pet ${index}`}
                  width="170"
                  loading="lazy"
                />
              </Zoom>
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
      <Grid item xs={12} md={6} p={4} spacing={4}>
        <Typography variant="h4" style={{ marginTop: "70px" }}>
          {selectedPet?.name}
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          style={{ lineHeight: "40px", marginTop: "10px" }}
        >
          Breed- {selectedPet?.breed}
        </Typography>

        <Typography
          variant="h5"
          color="text.secondary"
          style={{ lineHeight: "40px" }}
        >
          Age- {selectedPet?.age}
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          style={{ lineHeight: "40px" }}
        >
          Color- {selectedPet?.color}
        </Typography>
        <Typography
          variant="subtitle1"
          paragraph
          style={{ lineHeight: "40px" }}
        >
          {selectedPet?.description}
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Adopt
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 400, ...style }}>
            <Typography variant="h5">Adoption Form</Typography>
            <AdoptionForm closeModel={() => setOpen(false)} />
          </Box>
        </Modal>
      </Grid>
    </Grid>
  );
};

export default PetProfilePage;
