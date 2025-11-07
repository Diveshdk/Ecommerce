import { createSlice } from "@reduxjs/toolkit";


export const LoggedSlice = createSlice({
    name: "loggedin",
    initialState : false,
    reducers :{
        toggel : (state)=>{
            return !state;
        }
    }
});

export const {toggel} = LoggedSlice.actions;

export default LoggedSlice.reducer;