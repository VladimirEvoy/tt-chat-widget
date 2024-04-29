import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from 'configs/api'
import { toast } from 'react-toastify'

export const getChats = createAsyncThunk(
  'chats/getChats',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/backoffice/chats')
      return response.data
    } catch (error) {
      toast.error(error.response.data.message || 'Unknown error')

      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const getChatMessagesById = createAsyncThunk(
  'chats/getChatMessagesById',
  async (chatId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/backoffice/chats/${chatId}/messages`
      )
      return response.data
    } catch (error) {
      toast.error('Failed to load messages')

      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const sendMessage = createAsyncThunk(
  'chats/sendMessage',
  async ({ chatId, message }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/backoffice/chats/${chatId}/messages`,
        {
          message,
        }
      )
      return response.data
    } catch (error) {
      toast.error('Failed to load messages')

      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
