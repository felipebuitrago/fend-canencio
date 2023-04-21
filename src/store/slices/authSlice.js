import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  autorizado: false,
  user: "canencio",
  id:"01",
  token:"jwt"
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
})

// Action creators are generated for each case reducer function
//export const { increment, decrement, incrementByAmount } = authSlice.actions

export default authSlice.reducer