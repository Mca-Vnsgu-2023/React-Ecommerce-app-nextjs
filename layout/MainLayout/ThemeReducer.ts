'use client';
import { createSlice } from "@reduxjs/toolkit";

interface themeState{
    themeMode: String
}

const getDefaultThemMode=()=>{
    if(typeof window !== 'undefined'){
        const themeMode= localStorage.getItem('themeMode') || 'light'
        return themeMode
    }else{
        return 'light'
    }
}
 
const initialState: themeState={
    themeMode: getDefaultThemMode()
}

const themSlice= createSlice({
    name:'theme',
    initialState,
    reducers:{
        themeToggle(state,action){
            localStorage.setItem('themeMode', action.payload)
            state.themeMode = action.payload
        }
    }
})

export const {themeToggle} = themSlice.actions

export default themSlice.reducer