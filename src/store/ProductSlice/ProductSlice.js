import { createSlice } from '@reduxjs/toolkit'

const productSlice=createSlice({
    name:'products',
    initialState:[],
    reducers:{
        getProducts(state,action){
            return action.payload
        }
    }
})

export const productMethod=productSlice.actions;

export default productSlice.reducer;