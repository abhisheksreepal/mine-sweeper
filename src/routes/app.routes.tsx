import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";

export const AppRouter: FC = () => {
  return (
    <BrowserRouter basename="/mine-sweeper">
      <Routes>
        <Route element={<HomePage></HomePage>} path="/"></Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
};
