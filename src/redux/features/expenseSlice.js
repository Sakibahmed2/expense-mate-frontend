import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  limit: 0,
  expenses: [],
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
  },
});

export const { setLimit, addExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
