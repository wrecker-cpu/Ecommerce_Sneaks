import { createSlice } from '@reduxjs/toolkit'

const resetState={
    name:'',
    phoneNumber:'',
    address:'',
    pincode:''
}

const shippingSlice=createSlice({
    name:'shippingAddress',
    initialState:{
        name:'',
        phoneNumber:'',
        address:'',
        pincode:''
    },
    reducers:{
        getShipping(state,action){
            return {...state,...action.payload}
        },
        resetShipping(state){
            return resetState;
        }
    }
})

export const {getShipping,resetShipping}=shippingSlice.actions;

export default shippingSlice.reducer;