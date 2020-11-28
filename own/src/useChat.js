import { useState } from 'react'
// import { w3cwebsocket as W3CWebSocket } from 'websocket'

// const client = new W3CWebSocket('ws://localhost:4000')
// the web socket for client
const client = new WebSocket('ws://localhost:4000')

const useChat = () => {
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState({})
  const [opened, setOpened] = useState(false)

  client.onmessage = (message) => {
    // the format of ws.send will be an object, and the content which is the JSON string
    // will be the value of 'data'.
    const { data } = message
    const [task, payload] = JSON.parse(data)

    switch (task) {
      case 'init': {
        setMessages(() => payload)
        break
      }
      case 'output': {
        console.log('setting...');
        setMessages(() => [...messages, ...payload])
        break
      }
      case 'status': {
        console.log(payload);
        setStatus(payload)
        break
      }
      case 'cleared': {
        setMessages([])
        break
      }
      default:
        break
    }
  }

  client.onopen = () => {
    setOpened(true)
  }

  const sendData = (data) => {
    // TODO
    client.send(JSON.stringify(data));
  }

  const sendMessage = (msg) => {
    // TODO
    const { name, body } = msg;
    const submission = ['input', msg];
    sendData(submission);
  }

  const clearMessages = () => {
    // TODO
    const submission = ['clear', null];
    sendData(submission);
  }

  return {
    status,
    opened,
    messages,
    sendMessage,
    clearMessages,
    sendData
  }
}

export default useChat

