"use client";

import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <Toaster richColors position="top-right" />
      {children}
    </Provider>
  );
};

export default Providers;
