import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user: null,
    status:false,
}

export const userSlice=createSlice({
    name: 'user',
    initialState,
    reducers:{
        login: (state,action)=>{
            state.user=action.payload.user;
            state.status=true;
            localStorage.setItem("accesstoken",JSON.stringify(action.payload.acesstoken));
            localStorage.setItem("refreshtoken",JSON.stringify(action.payload.refreshtoken));
        },
        logout:(state)=>{
            state.user=null;
            state.status=false;
            localStorage.removeItem("accesstoken");
            localStorage.removeItem("refreshtoken");
        }
    }
});


export const { login, logout } =userSlice.actions


export default userSlice.reducer