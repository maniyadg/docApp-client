import {createSlice} from '@reduxjs/toolkit'

export const alertSlice = createSlice({
    name:'alerts',
    initialState:{
        Loading:false
    },
    reducers:{
        showLoading:(state) => {
            state.Loading = true
        },
        hideLoading:(state) => {
            state.Loading = false
        }
    }
})

export const {showLoading , hideLoading} = alertSlice.actions