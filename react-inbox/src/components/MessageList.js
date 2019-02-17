import React from 'react'
import Message from './Message'

function MessageList({ messages, toggle }) {
  console.log(messages)
  return messages.map(message => <Message message={message} key={message.id} toggle={toggle} />)
}

export default MessageList
