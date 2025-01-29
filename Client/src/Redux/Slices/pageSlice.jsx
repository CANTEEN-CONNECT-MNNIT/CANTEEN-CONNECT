// PageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: "Home", 
  isOpen: false,   
  profileOpen:false  
};

const PageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            console.log(action)
            state.currentPage = action.payload; 
        },
        setOpen: (state, action) => {
            state.isOpen = action.payload; 
        },
        toggleOpen: (state) => {
            console.log(state)
            console.log(state.isOpen)
            state.isOpen = !state.isOpen;
        },
        navigateTo:(state,action)=>{
            const location=action.payload;
            console.log(location)
            const pageMapping={
                "/":"Home",
                "/dashboard":"Dashboard",
                "/OrderPage":"Track Order",
                "/canteen":"CanteenPage"
            }
            state.currentPage=pageMapping[location] || "Home"; 
        },
        setProfileOpen:(state,action)=>{
            state.profileOpen=action.payload
        }
    },
});


export const { setCurrentPage,setProfileOpen, setOpen,toggleOpen ,navigateTo } = PageSlice.actions;

export default PageSlice.reducer;
