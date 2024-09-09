import { createSlice } from '@reduxjs/toolkit'

const currentPageSlice=createSlice({
    name:'currentpage',
    initialState:1,
    reducers:{
        setCurrentPage(state,action){
            return action.payload
        }
    }
})

export const currentPageMethod=currentPageSlice.actions;

export default currentPageSlice.reducer;