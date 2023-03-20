import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [],
  transactions: [],
}

export const expenseSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getTransactions: (state, action) => {

    },
  },
})

export const { getTransactions } = expenseSlice.actions

export default expenseSlice.reducer