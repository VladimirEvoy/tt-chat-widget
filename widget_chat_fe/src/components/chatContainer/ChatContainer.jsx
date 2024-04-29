import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { COLOR_PRIMARY, COLOR_WHITE } from '../../constants/appColors'
import useOutsideClick from '../../hooks/useOutsideClick'
import { IconButton } from '../../ui/iconButton/IconButton'
import { MessageList } from '../messageList/MessageList'
import {
  StyledAddChatButton,
  StyledChatContainer,
  StyledChatContainerBody,
  StyledChatContainerHeader,
  StyledChatContainerInner,
  StyledChatContainerInputBox,
  StyledChatContainerTitle,
} from './style'

import {
  createChat,
  getChatById,
  getMyChats,
  sendMessage,
} from '../../api/base'
import CloseIcon from '../../ui/icons/CloseIcon'
import BackIcon from '../../ui/icons/BackIcon'
import SendIcon from '../../ui/icons/SendIcon'
import { TextArea } from '../../ui/textArea/TextArea'
import { Login } from '../login/Login'
import { ChatsList } from '../chatsList/ChatsList'
import { configureSocket } from '../../configs/socket'

export const ChatContainer = ({
  isChatContainerOpen,
  onOutsideClicked,
  socketConfigs,
}) => {
  const ref = useRef(null)
  useOutsideClick(ref, onOutsideClicked)

  const [isAddNewChat, setIsAddNewChat] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [chatId, setChatId] = useState('')
  const [clientId, setClientId] = useState('')
  const [chatsList, setChatsList] = useState(null)
  const [messagesList, setMessagesList] = useState(null)
  const [currentMessage, setCurrentMessage] = useState('')

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!chatId || isAddNewChat) {
      createChat(socketConfigs.apiUrl, {
        name,
        email,
        message: currentMessage,
      }).then((res) => {
        localStorage.setItem('clientId', res.data.client_id)
        setClientId(res.data.client_id)
        setChatId(res.data.id)
        setIsAddNewChat(false)
        setCurrentMessage('')
      })
    } else {
      sendMessage(socketConfigs.apiUrl, {
        chatId,
        senderId: clientId,
        message: currentMessage,
      }).then(() => {
        setCurrentMessage('')
      })
    }
  }

  const loginUser = ({ name, email }) => {
    localStorage.setItem('name', name)
    localStorage.setItem('email', email)

    setName(name)
    setEmail(email)
  }

  useEffect(() => {
    setMessagesList(null)

    if (chatId) {
      getChatById(socketConfigs.apiUrl, chatId).then((res) =>
        setMessagesList(res.data)
      )

      const onMessageSent = (e) => {
        setMessagesList((prev) => [...prev, e.data])
      }

      let channel = null

      if (window.Echo) {
        channel = window.Echo.channel(`chat.${chatId}`)
        channel.listen('MessageSent', onMessageSent)
      } else {
        window.addEventListener('load', function () {
          channel = window.Echo.channel(`chat.${chatId}`)
          channel.listen('MessageSent', onMessageSent)
        })
      }

      return () => {
        channel?.stopListening('MessageSent', onMessageSent)
      }
    }
  }, [chatId])

  useEffect(() => {
    if (clientId && !chatId) {
      getMyChats(socketConfigs.apiUrl, clientId).then((res) => {
        setChatsList(res.data)
      })
    }
  }, [chatId, clientId])

  useEffect(() => {
    if (email) {
      configureSocket(socketConfigs)
    }
  }, [email, socketConfigs])

  useEffect(() => {
    const name = localStorage.getItem('name')
    const email = localStorage.getItem('email')
    const clientId = localStorage.getItem('clientId')

    setName(name || '')
    setEmail(email || '')
    setClientId(clientId || '')
  }, [])

  return (
    <StyledChatContainer $isChatContainerOpen={isChatContainerOpen} ref={ref}>
      <StyledChatContainerInner>
        <StyledChatContainerHeader>
          {!chatId && !isAddNewChat ? (
            <StyledChatContainerTitle>Chat now</StyledChatContainerTitle>
          ) : (
            <IconButton
              icon={<BackIcon />}
              size={24}
              iconColor={COLOR_WHITE}
              backgroundColor={'transparent'}
              onClick={(e) => {
                e.stopPropagation()
                setChatId(null)
                setIsAddNewChat(false)
              }}
            />
          )}
          <IconButton
            icon={<CloseIcon />}
            size={24}
            iconColor={COLOR_WHITE}
            backgroundColor={'transparent'}
            onClick={onOutsideClicked}
          />
        </StyledChatContainerHeader>
        <StyledChatContainerBody>
          {email ? (
            clientId && !chatId && !isAddNewChat ? (
              <>
                <StyledAddChatButton
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsAddNewChat(true)
                  }}
                >
                  Add Chat
                </StyledAddChatButton>
                <ChatsList
                  chats={chatsList}
                  handleChatClick={(chatId) => setChatId(chatId)}
                />
              </>
            ) : (
              <>
                <MessageList messages={messagesList} myEmail={email} />
                <form onSubmit={handleSendMessage}>
                  <StyledChatContainerInputBox>
                    <TextArea
                      placeholder='Send Message'
                      value={currentMessage}
                      onChange={(e) => {
                        setCurrentMessage(e.target.value)
                      }}
                    />
                    <IconButton
                      type='submit'
                      icon={<SendIcon />}
                      size={30}
                      iconColor={COLOR_WHITE}
                      backgroundColor={COLOR_PRIMARY}
                    />
                  </StyledChatContainerInputBox>
                </form>
              </>
            )
          ) : (
            <Login onLogin={loginUser} />
          )}
        </StyledChatContainerBody>
      </StyledChatContainerInner>
    </StyledChatContainer>
  )
}

ChatContainer.propTypes = {
  isChatContainerOpen: PropTypes.bool,
  onOutsideClicked: PropTypes.func,
}
