import LimitForm from "@/components/form/limitForm/LimitForm";
import React from "react";

import "@/styles/home.css";

const HomePage = () => {
  return (
    <div className="container">
      <div className="child-container">
        <h1 className="title">Set Monthly Spending Limits</h1>

        <LimitForm />
      </div>
    </div>
  );
};

export default HomePage;
