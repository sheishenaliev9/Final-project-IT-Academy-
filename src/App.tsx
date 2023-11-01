import { Route, Routes } from "react-router";
import { Layout } from "./layout/Layout";
import React from "react";
import {
  Booking,
  Cart,
  Home,
  Login,
  OneRestaurant,
  Profile,
  Register,
  Restaurants,
} from "./pages";
import { PrivateRoute } from "./components";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:id" element={<OneRestaurant />} />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route path="/registration" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booking/:id" element={<Booking />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
