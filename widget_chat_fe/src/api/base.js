const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  Accept: '*/*',
}

export const createChat = async (baseApiUrl, data) => {
  try {
    const response = await fetch(baseApiUrl + '/chats', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })

    return await response.json()
  } catch (error) {
    throw new Error(error)
  }
}

export const sendMessage = async (baseApiUrl, { chatId, senderId, message }) => {
  try {
    const response = await fetch(baseApiUrl + `/chats/${chatId}/messages`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ message, sender_id: senderId }),
    })

    return await response.json()
  } catch (error) {
    throw new Error(error)
  }
}

export const getChatById = async (baseApiUrl, chatId) => {
  try {
    const response = await fetch(baseApiUrl + `/chats/${chatId}/messages`, {
      method: 'GET',
      headers: headers,
    })

    return await response.json()
  } catch (error) {
    throw new Error(error)
  }
}

export const getMyChats = async (baseApiUrl, clientId) => {
  try {
    const response = await fetch(baseApiUrl + `/chats?client_id=${clientId}`, {
      method: 'GET',
      headers: headers,
    })

    return await response.json()
  } catch (error) {
    throw new Error(error)
  }
}
