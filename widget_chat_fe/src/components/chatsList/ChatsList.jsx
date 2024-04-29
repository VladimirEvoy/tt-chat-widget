import { ChatItemWrapper } from './style'

export const ChatsList = ({ chats, handleChatClick }) => {
  if (!chats) {
    return null
  }

  return (
    <ul>
      {chats.map((chat) => (
        <ChatItemWrapper
          key={chat.id}
          onClick={(e) => {
            e.stopPropagation()
            handleChatClick(chat.id)
          }}
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
        </ChatItemWrapper>
      ))}
    </ul>
  )
}
