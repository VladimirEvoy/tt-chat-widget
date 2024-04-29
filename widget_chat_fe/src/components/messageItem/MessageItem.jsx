import React from 'react'
import PropTypes from 'prop-types'
import {
  StyledMessageItem,
  MessageAvatarWrapper,
  MessageContent,
} from './style'
import UserDefault from '../../ui/icons/UserDefault'

export const MessageItem = ({ message, myEmail }) => {
  const $isSender = message.sender.email === myEmail

  return (
    <StyledMessageItem key={message.id} $isSender={$isSender}>
      <MessageAvatarWrapper>
        <UserDefault />
      </MessageAvatarWrapper>
      <div>
        <MessageContent $isSender={$isSender}>{message.message}</MessageContent>
        <div>
          <small>{new Date(message.created_at).toLocaleString()}</small>
        </div>
      </div>
    </StyledMessageItem>
  )
}

MessageItem.propTypes = {
  message: PropTypes.any,
}
