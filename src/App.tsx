import { Route, Routes } from "react-router";
import { Layout } from "./layout/Layout";
import React from "react";
import {
  Booking,
  Cart,
  Home,
  Login,
  OneRestaurant,
  Payment,
  Profile,
  Register,
  Restaurants,
} from "./pages";
import { PrivateRoute } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <Route path="/payment" element={<Payment />} />
          <Route
            path="/booking/:id"
            element={
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;
