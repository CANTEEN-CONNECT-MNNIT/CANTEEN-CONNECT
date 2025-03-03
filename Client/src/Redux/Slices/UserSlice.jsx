import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  canteen:null,
  status: false,
  loading: false,
  error: '',
  success:'',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = '';
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      // console.log(action.payload)
      state.user = action.payload;
      state.status=true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: () => initialState,
    setCanteen:(state,action)=>{
      state.canteen=action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = '';
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearSuccess: (state) => {
      state.success = '';
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setError,
  clearError,
  setSuccess,
  setCanteen,
  clearSuccess,
} = userSlice.actions;

export default userSlice.reducer;
