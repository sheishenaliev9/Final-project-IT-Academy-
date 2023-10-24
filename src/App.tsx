import { Route, Routes } from "react-router";
import "./App.scss";
import { Layout } from "./layout/Layout";
import React from "react";
import { Home } from "./pages";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
