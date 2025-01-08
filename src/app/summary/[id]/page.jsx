"use client";

import {
  useGetSingleExpenseQuery,
  useUpdateExpensesMutation,
} from "@/redux/api/expensesApi";
import React from "react";

import "../../../styles/expenses.css";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingUI from "@/components/ui/LoadingUI";

const EditExpensePage = ({ params }) => {
  const { id } = React.use(params);
  const { data: singleExpense, isLoading } = useGetSingleExpenseQuery({
    id: id,
  });
  const [updateExpense] = useUpdateExpensesMutation();

  const router = useRouter();

  if (isLoading) {
    return <LoadingUI />;
  }

  const expense = singleExpense?.data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating expense...");

    try {
      const updatedData = {
        category: e.target.category.value,
        amount: Number(e.target.amount.value),
        purpose: e.target.purpose.value,
      };

      console.log(updatedData);

      const res = await updateExpense({ id: id, data: updatedData }).unwrap();

      console.log(res);

      if (res?.success) {
        toast.success("Expense updated successfully", { id: toastId });
        router.push("/summary");
      }
    } catch (err) {
      toast.error("Failed to update expense", { id: toastId });
      console.log(err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="child-container">
        <h1
          style={{
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          Update your expense
        </h1>

        <div>
          <select defaultValue={expense?.category} disabled name="category">
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
            name="purpose"
            type="text"
            placeholder="Purpose"
            defaultValue={expense?.purpose}
          />
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            defaultValue={expense?.amount}
          />
        </div>

        <button>Update Expense</button>
      </form>
    </div>
  );
};

export default EditExpensePage;
