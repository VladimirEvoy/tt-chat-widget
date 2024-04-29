import { useEffect, useRef } from 'react'
import { MessageItem } from '../messageItem/MessageItem'
import { StyledMessageList } from './style'

export const MessageList = ({ messages, myEmail }) => {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef?.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <StyledMessageList>
      {messages && messages.length
        ? messages.map((message) => {
            return (
              <MessageItem
                key={message.id}
                message={message}
                myEmail={myEmail}
              />
            )
          })
        : null}
      <div ref={messagesEndRef}></div>
    </StyledMessageList>
  )
}
