import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";
import { IconSprite } from "./components";

import "./App.css";
import "./style/less/index.less";

export default function App() {
  return (
    <BrowserRouter forceRefresh={false}>
      <IconSprite />
      <Routes />
    </BrowserRouter>
  );
}
