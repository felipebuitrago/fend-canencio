import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: 'checking', // 'authenticated' - 'not-authenticated' 
  user: {},
  errorMessage: undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checking : (state) => {
      state.status = 'checking';
      state.user   = {};
      state.errorMessage = undefined
    },

    login : (state,{payload}) => {
      state.status = 'authenticated';
      state.user   = payload;
      state.errorMessage = undefined
    },

    logout: ( state, { payload } ) => {
      state.status = 'not-authenticated';
      state.user   = {};
      state.errorMessage = payload;
    },

    clearErrorMessage: ( state ) => {
        state.errorMessage = undefined;
    }
  },
})

// Action creators are generated for each case reducer function
export const { checking, login, logout, clearErrorMessage } = authSlice.actions

export default authSlice.reducer