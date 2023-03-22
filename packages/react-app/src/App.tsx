import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";
import { IconSprite } from "./components";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <IconSprite />
      <Routes />
    </BrowserRouter>
  );
}
