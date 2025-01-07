"use client";

import { setLimit } from "@/redux/features/expenseSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LimitForm = () => {
  const [limits, setLocalLimits] = useState(0);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = () => {
    dispatch(setLimit(limits));
    router.push("/expenses");
  };

  return (
    <div>
      <div>
        <input
          onChange={(e) => setLocalLimits(e.target.value)}
          type="number"
          placeholder="Set your limits"
        />
      </div>

      <button onClick={() => handleSubmit()}>Set Limits</button>
    </div>
  );
};

export default LimitForm;
