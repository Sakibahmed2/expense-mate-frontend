"use client";

import { addExpense } from "@/redux/features/expenseSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../../../styles/expenses.css";
import { useCreateExpensesMutation } from "@/redux/api/expensesApi";
import { toast } from "sonner";

const Expenses = () => {
  const [createExpense] = useCreateExpensesMutation();
  const [limitError, setLimitError] = useState("");
  const [expense, setExpense] = useState({
    category: "",
    purpose: "",
    amount: 0,
  });

  const limits = useSelector((state) => state.expenses.limit);
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();
  const router = useRouter();

  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const handleAddExpense = async () => {
    const toastId = toast.loading("Adding expense...");
    try {
      if (
        totalExpense > limits ||
        totalExpense + Number(expense.amount) > limits
      ) {
        setLimitError("Total expense exceeded limit!");
        toast.error("Total expense exceeded limit!", { id: toastId });
        return;
      }
      dispatch(addExpense({ ...expense, date: new Date().toLocaleString() }));
      const res = await createExpense({
        ...expense,
        date: new Date().toLocaleString(),
      }).unwrap();

      if (res?.success) {
        toast.success("Expense added successfully", { id: toastId });
      }

      setExpense({ category: "", purpose: "", amount: "" });
    } catch (err) {
      console.log(err);
      toast.error("Failed to add expense", { id: toastId });
    }
  };

  return (
    <div className="container">
      <div className="child-container">
        <h1>Add your expense</h1>

        <p className="limit-text">Your limit is: {limits}</p>

        <div>
          <select
            value={expense.category}
            onChange={(e) =>
              setExpense({ ...expense, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            <option value="groceries">Groceries</option>
            <option value="transport">Transport</option>
            <option value="healthCare">Health care</option>
            <option value="utility">Utility</option>
            <option value="charity">Charity</option>
          </select>
        </div>

        <div className="input-container">
          <input
            type="text"
            placeholder="Purpose"
            value={expense.purpose}
            onChange={(e) =>
              setExpense({ ...expense, purpose: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Amount"
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
          />
        </div>

        {limitError && <p className="expenses-error">{limitError}</p>}

        <button onClick={handleAddExpense}>Add Expense</button>
        <button onClick={() => router.push("/summary")}>View Summary</button>
      </div>
    </div>
  );
};

export default Expenses;
