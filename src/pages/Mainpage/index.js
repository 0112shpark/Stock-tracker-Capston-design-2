import React from "react";
import Nav from "../../components/Nav";
import "./index.css";

import Dashboard from "../../components/Dashboard";
const MainPage = () => {
  return (
    <>
      <div className="container1">
        <Nav />
        <Dashboard />
      </div>
    </>
  );
};

export default MainPage;
