// ValidationSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shippingAddress: {
    name: '',
    phoneNumber: '',
    address: '',
    pincode: '',
  },
  errors: {},
};

const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    setValidationErrors(state, action) {
      const { field, message } = action.payload;
      state.errors[field] = message;
    },
    resetValidationErrors(state) {
      state.errors = {};
    },
  },
});

export const { setValidationErrors, resetValidationErrors } = validationSlice.actions;

export default validationSlice.reducer;
