import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from 'store/auth-slice/slice'
import { chatReducer } from 'store/chats-slice/slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
})
