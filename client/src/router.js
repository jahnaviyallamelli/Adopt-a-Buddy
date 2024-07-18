import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CategorizedAnimal from "./Pages/CategorizedAnimal";
import PetProfilePage from "./Pages/PetProfilePage";

const Router = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path=":category">
          <Route index element={<CategorizedAnimal />} />
          <Route index={false} path=":id" element={<PetProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
