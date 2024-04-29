import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const mountChatWidget = (containerId, socketSettings) => {
  const container = document.getElementById(containerId)
  if (!container) {
    console.error('Container not found:', containerId)
    return
  }
  const root = createRoot(container)
  root.render(<App socketSettings={socketSettings} />)
}

window.chatWidget = { mountChatWidget }
