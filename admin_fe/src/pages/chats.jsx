import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { chatActions } from 'store/chats-slice/slice'

export function ChatsPage() {
  const { isChatsLoading, chats } = useSelector((state) => state.chat)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(chatActions.getChats())
  }, [dispatch])

  const handleChatClick = (chatId) => {
    navigate(`/chats/${chatId}`)
  }

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      {isChatsLoading ? (
        <p>Loading chats...</p>
      ) : chats?.length > 0 ? (
        <div>
          <ul>
            {chats.map((chat) => (
              <li
                key={chat.id}
                className='mb-2 p-3 bg-white rounded shadow cursor-pointer hover:bg-gray-200'
                onClick={() => handleChatClick(chat.id)}
              >
                <p>
                  <strong>Chat ID:</strong> {chat.id}
                </p>
                <p>
                  <strong>Status:</strong> {chat.status}
                </p>
                <p>
                  <strong>Started:</strong> {chat.started_at}
                </p>
                <p>
                  <strong>Messages:</strong> {chat.messages.length}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No chats yet.</p>
      )}
    </div>
  )
}
