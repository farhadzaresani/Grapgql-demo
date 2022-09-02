import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";

export default function Home({ data, onclick }) {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
