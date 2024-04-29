import { createSlice } from '@reduxjs/toolkit'
import {
  getChatMessagesById,
  getChats,
  sendMessage,
} from 'store/chats-slice/services'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: null,
    isChatsLoading: false,
    getChatsError: null,

    chatMessages: null,
    getChatMessagesError: null,
    isGetChatMessagesLoading: false,

    isSendMessageLoading: false,
  },
  reducers: {
    addMessage: (state, { payload }) => {
      state.chatMessages = [...state.chatMessages, payload.data]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChats.pending, (state) => {
        state.isChatsLoading = true
        state.getChatsError = null
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.chats = action.payload.data
        state.getChatsError = null
        state.isChatsLoading = false
      })
      .addCase(getChats.rejected, (state, action) => {
        state.isChatsLoading = false
        state.getChatsError = action.payload || 'Failed to load chats'
      })

      .addCase(getChatMessagesById.pending, (state) => {
        state.isGetChatMessagesLoading = true
        state.getChatMessagesError = null
      })
      .addCase(getChatMessagesById.fulfilled, (state, action) => {
        state.chatMessages = action.payload.data
        state.getChatMessagesError = null
        state.isGetChatMessagesLoading = false
      })
      .addCase(getChatMessagesById.rejected, (state) => {
        state.isGetChatMessagesLoading = false
        state.getChatMessagesError = 'Failed to load messages'
      })

      .addCase(sendMessage.pending, (state) => {
        state.isSendMessageLoading = true
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isSendMessageLoading = false
      })
      .addCase(sendMessage.rejected, (state) => {
        state.isSendMessageLoading = false
      })
  },
})

export const chatActions = {
  ...chatSlice.actions,
  getChats,
  getChatMessagesById,
  sendMessage,
}

export const chatReducer = chatSlice.reducer
