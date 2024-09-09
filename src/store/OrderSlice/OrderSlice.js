import { createSlice } from '@reduxjs/toolkit'

const orderSlice=createSlice({
    name:'order',
    initialState:{
        orders: []
    },
    reducers:{
        setOrder(state,action){
            const { id, items, shippingAddress } = action.payload;
            state.orders.push({ id, items, shippingAddress });
        }
    }
})

export const {setOrder}=orderSlice.actions;

export default orderSlice.reducer;