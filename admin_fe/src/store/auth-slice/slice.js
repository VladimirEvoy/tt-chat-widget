import { createSlice } from '@reduxjs/toolkit'
import { login, logout } from 'store/auth-slice/services'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: localStorage.getItem('token') ?? null,
    userEmail: localStorage.getItem('email') ?? null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, { payload, meta }) => {
        localStorage.setItem('token', payload.access_token)
        localStorage.setItem('email', meta.arg.email)
        state.userEmail = meta.arg.email
        state.isLoading = false
        state.isAuth = true
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(logout.pending, (state) => {
        state.isAuth = false
        state.userEmail = null
      })
      .addCase(logout.fulfilled, () => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
      })
  },
})

export const authActions = { ...authSlice.actions, login, logout }

export const authReducer = authSlice.reducer
