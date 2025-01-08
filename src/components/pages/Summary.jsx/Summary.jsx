"use client";

import React from "react";
import "@/styles/summary.css";
import {
  useDeleteExpensesMutation,
  useGetExpensesQuery,
} from "@/redux/api/expensesApi";
import { Delete, Pencil } from "lucide-react";
import Link from "next/link";
import LoadingUI from "@/components/ui/LoadingUI";
import { toast } from "sonner";

const Summary = () => {
  const { data, isLoading } = useGetExpensesQuery({});
  const [deleteExpense] = useDeleteExpensesMutation();

  const expenses = data?.data;

  if (isLoading) return <LoadingUI />;

  // Get unique dates from expenses
  const uniqueDates = [
    ...new Set(
      expenses.map((expense) => {
        return new Date(expense.date).toLocaleDateString();
      })
    ),
  ];

  const categories = [
    "healthCare",
    "utility",
    "transport",
    "miscellaneous",
    "groceries",
    "charity",
  ];

  const generateTable = () => {
    return uniqueDates.map((date) => {
      const row = { date, categories: {}, ids: {} };

      expenses.forEach((expense) => {
        const expenseDate = new Date(expense.date).toLocaleDateString();
        if (expenseDate === date) {
          row.categories[expense.category] = expense.amount;
          row.ids[expense.category] = expense._id;
        }
      });

      return row;
    });
  };

  const tableData = generateTable();

  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting expense...");
    try {
      const res = await deleteExpense(id).unwrap();

      if (res?.success) {
        toast.success("Expense deleted successfully", { id: toastId });
      }
    } catch (err) {
      toast.error("Failed to delete expense", { id: toastId });
      console.log(err);
    }
  };

  return (
    <div className="table-container">
      <table border={3} className="styled-table">
        <caption className="table-caption">Summary of your expenses</caption>
        <thead>
          <tr>
            <th>Date</th>
            {categories.map((category) => (
              <th key={category}>{category}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.date}>
              <td>{row.date}</td>
              {categories.map((category) => (
                <td key={category}>
                  <div className="icons-container">
                    <Link href={`/summary/${row.ids[category]}`}>
                      <Pencil size={25} className="edit-icon" />
                    </Link>

                    <Delete
                      onClick={() => handleDelete(row.ids[category])}
                      size={25}
                      className="delete-icon"
                    />
                  </div>

                  {row.categories[category] || "x"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Summary;
