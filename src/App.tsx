import { Route, Routes } from "react-router";
import "./App.scss";
import { Layout } from "./layout/Layout";
import React from "react";
import { Home, Login, Profile, Register } from "./pages";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
