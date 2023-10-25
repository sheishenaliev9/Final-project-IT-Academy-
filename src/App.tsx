import { Route, Routes } from "react-router";
import "./App.scss";
import { Layout } from "./layout/Layout";
import React from "react";
import { Home, Login, Register } from "./pages";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
