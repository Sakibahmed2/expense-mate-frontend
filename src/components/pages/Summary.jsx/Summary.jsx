"use client";

import React from "react";
import { useSelector } from "react-redux";
import "@/styles/summary.css";

const Summary = () => {
  const expenses = useSelector((state) => state.expenses.expenses);

  console.log(expenses);

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
      const row = { date, categories: {} };

      expenses.forEach((expense) => {
        const expenseDate = new Date(expense.date).toLocaleDateString();
        if (expenseDate === date) {
          row.categories[expense.category] = expense.amount;
        }
      });

      return row;
    });
  };

  const tableData = generateTable();

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
                <td key={category}>{row.categories[category] || ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Summary;
