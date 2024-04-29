import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { chatActions } from 'store/chats-slice/slice'

export function ChatDetailsPage() {
  const { userEmail } = useSelector((state) => state.auth)
  const {
    chatMessages,
    isGetChatMessagesLoading,
    getChatMessagesError,
    isSendMessageLoading,
  } = useSelector((state) => state.chat)

  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)

  const { id } = useParams()
  const dispatch = useDispatch()

  const sendMessage = () => {
    if (!newMessage.trim()) return
    dispatch(chatActions.sendMessage({ chatId: id, message: newMessage }))

    setNewMessage('')
  }

  useEffect(() => {
    dispatch(chatActions.getChatMessagesById(id))

    const onMessageSent = (e) => {
      dispatch(chatActions.addMessage(e))
    }

    let channel = null

    if (window.Echo) {
      channel = window.Echo.channel(`chat.${id}`)
      channel.listen('MessageSent', onMessageSent)
    } else {
      window.addEventListener('load', function () {
        channel = window.Echo.channel(`chat.${id}`)
        channel.listen('MessageSent', onMessageSent)
      })
    }

    return () => {
      channel?.stopListening('MessageSent', onMessageSent)
    }
  }, [dispatch, id])

  useEffect(() => {
    if (messagesEndRef?.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages])

  if (isGetChatMessagesLoading) return <div>Loading messages...</div>
  if (getChatMessagesError) return <div>Error: {getChatMessagesError}</div>

  return (
    <div className='flex flex-col bg-gray-100 p-4 h-custom'>
      <div className='flex-grow overflow-auto'>
        {chatMessages && chatMessages.length > 0 ? (
          chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                userEmail === message.sender.email
                  ? 'justify-end'
                  : 'justify-start'
              } mb-2`}
            >
              <div
                className={`max-w-xl break-words p-2 rounded-lg shadow ${
                  userEmail === message.sender.email
                    ? 'bg-blue-100'
                    : 'bg-white'
                }`}
              >
                <p>{message.message}</p>
                <p className='text-sm text-gray-600 text-right'>
                  <small>{new Date(message.created_at).toLocaleString()}</small>
                </p>
                <p className='text-xs text-gray-600 text-right'>
                  {message.sender.name}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No messages in this chat.</p>
        )}
        <div ref={messagesEndRef}></div>
      </div>
      <div className='mt-4'>
        <textarea
          disabled={isSendMessageLoading}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className='w-full p-2 text-sm text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring'
          rows='3'
          placeholder='Type your message here...'
        ></textarea>
        <button
          disabled={isSendMessageLoading}
          onClick={sendMessage}
          className='w-full mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Send Message
        </button>
      </div>
    </div>
  )
}
