import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    currentAdmin : null,
    loading: false,
    error:false
}

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        adminLoginStart: (state) =>{
            state.loading = true
        },
        adminLoginSuccess:(state, action) => {
            state.currentAdmin = action.payload
            state.loading = false
            state.error = false
        },
        adminLoginFailure : (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        adminLogout : (state, action) => {
            state.currentAdmin = null
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { adminLoginStart, adminLoginSuccess, adminLoginFailure, adminLogout } = adminSlice.actions;

export default adminSlice.reducer;