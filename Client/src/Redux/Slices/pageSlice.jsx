// PageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  isOpen: false,   
  profileOpen:false ,
  merchantprofileOpen:false,
  activeMenu:"Dashboard"
};

const PageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {

        // For Sidebar Menu
        setactiveMenu:(state,action)=>{
            state.activeMenu=action.payload;
        },

        // For Sidebar
        setOpen: (state, action) => {
            state.isOpen = action.payload; 
        },
        toggleOpen: (state) => {
            state.isOpen = !state.isOpen;
        },

        // UserProfile
        setProfileOpen:(state,action)=>{
            state.profileOpen=action.payload
        },

        // MerchantProfile
        setMerchantProfileOpen:(state,action)=>{
            state.merchantprofileOpen=action.payload
        }
    },
});


export const { setMerchantProfileOpen,setactiveMenu,setCurrentPage,setProfileOpen, setOpen,toggleOpen ,navigateTo } = PageSlice.actions;

export default PageSlice.reducer;
