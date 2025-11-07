import { createSlice } from "@reduxjs/toolkit";


export const CartSlice = createSlice({
    name: "cart",
    initialState : [],
    reducers :{
        addToCart: (state, actions)=>{
            state.push(actions.payload);
        },
        removeFromCart : (state, actions)=>{
            return state.filter((p)=> p.id !== actions.payload);
        }
    }
});

export const {addToCart, removeFromCart} = CartSlice.actions;

export default CartSlice.reducer;