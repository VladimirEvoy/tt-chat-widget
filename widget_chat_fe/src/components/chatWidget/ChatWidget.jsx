import { useState } from 'react'
import { IconButtonWrapper, StyledChatWidget } from './style'
import { IconButton } from '../../ui/iconButton/IconButton'
import { ChatContainer } from '../chatContainer/ChatContainer'
import { COLOR_PRIMARY, COLOR_WHITE } from '../../constants/appColors'
import ChatIcon from '../../ui/icons/ChatIcon'

export const ChatWidget = ({ socketSettings }) => {
  const [isChatContainerOpen, setIsChatContainerOpen] = useState(false)

  const handleChatContainerVisibility = (ev) => {
    ev.stopPropagation()
    setIsChatContainerOpen(!isChatContainerOpen)
  }

  return (
    <StyledChatWidget>
      <IconButtonWrapper>
        <IconButton
          icon={<ChatIcon />}
          size={60}
          iconColor={COLOR_WHITE}
          backgroundColor={COLOR_PRIMARY}
          onClick={handleChatContainerVisibility}
        />
      </IconButtonWrapper>

      <ChatContainer
        socketConfigs={socketSettings}
        isChatContainerOpen={isChatContainerOpen}
        onOutsideClicked={() => {
          setIsChatContainerOpen(false)
        }}
      />
    </StyledChatWidget>
  )
}
