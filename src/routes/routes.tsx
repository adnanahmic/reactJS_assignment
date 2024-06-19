import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./allRoutes";
import HomePage from "../pages/HomePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* navigation menu  */}
      <Route path={ROUTES.flowers} element={<HomePage />} />
      <Route path={ROUTES.latestSightings} element={<p>latestSightings</p>} />
    </Routes>
  );
};

export default AppRoutes;
