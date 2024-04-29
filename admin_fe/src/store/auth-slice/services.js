import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from 'configs/api'
import { toast } from 'react-toastify'

export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/admin/login', userData)
      return response.data
    } catch (error) {
      toast.error(
        'Login failed: ' + error.response.data.message || 'Unknown error'
      )

      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/backoffice/logout', userData)
      return response.data
    } catch (error) {
      toast.error(
        'Logout failed: ' + error.response.data.message || 'Unknown error'
      )

      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
