import React, { Component } from 'react'
import './App.css'
import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'
import ComposeForm from './components/ComposeForm'

class App extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      composing: false
    }
  }

  async componentDidMount() {
    let data = await fetch('http://localhost:8082/api/messages')
    let messages = await data.json()
    messages.forEach(message => { delete message.selected })
    this.setState({ messages })
  }

  updateServerData(ids, command, read = '', label = '') {
    fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({ messageIds: ids, command, read, label }),
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })
  }

  toggle = (id, thingToToggle) => {
    if (thingToToggle === 'starred') {
      this.updateServerData([ id ], 'star')
    }

    this.setState(prevState => ({
      messages: prevState.messages.map(message =>
        {
          if (message.id === id) {
            return { ...message, [thingToToggle]: message[thingToToggle] ? false : true }
          }
          return message
        })
    }))
  }

  toggleSelectAll = () => {
    let allSelected = this.state.messages.reduce((all, message) => !message.selected ? false : all, true)

    if (allSelected) {
      this.setState(prevState => ({
        messages: prevState.messages.map(message => ({ ...message, selected: false}))
      }))
    }
    else {
      this.setState(prevState => ({
        messages: prevState.messages.map(message => ({ ...message, selected: true }))
      }))
    }
  }

  markReadUnread = (changeType) => {
    let ids = []
    this.state.messages.forEach(message => { if (message.selected) { ids.push(message.id) } })
    this.updateServerData(ids, 'read', changeType)

    this.setState(prevState => ({
      messages: prevState.messages.map(message =>
      {
        if (message.selected) {
          return { ...message, read: changeType }
        }
        return message
      })
    }))
  }

  deleteMessages = () => {
    let ids = []
    this.state.messages.forEach(message => { if (message.selected) { ids.push(message.id) } })
    this.updateServerData(ids, 'delete')

    this.setState(prevState => ({ messages: prevState.messages.filter(message => !message.selected) }))
  }

  addLabel = (label) => {
    let ids = []
    this.state.messages.forEach(message => { if (message.selected) { ids.push(message.id) } })
    this.updateServerData(ids, 'addLabel', '', label)

    this.setState(prevState => ({
      messages: prevState.messages.map(message =>
      {
        if (message.selected && !message.labels.includes(label)) {
          return { ...message, labels: [ ...message.labels, label ]}
        }
        return message
      })
    }))
  }

  removeLabel = (label) => {
    let ids = []
    this.state.messages.forEach(message => { if (message.selected) { ids.push(message.id) } })
    this.updateServerData(ids, 'removeLabel', '', label)

    this.setState(prevState => ({
      messages: prevState.messages.map(message =>
      {
        if (message.selected && message.labels.includes(label)) {
          return { ...message, labels: message.labels.filter(el => el !== label) }
        }
        return message
      })
    }))
  }

  compose = () => {
    this.setState(prevState => ({ composing: prevState.composing ? false : true }))
  }

  sendMessage = (message) => {
    fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(message),
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })

    this.setState(prevState => ( { composing: false, messages: [...prevState.messages,
      { ...message, read: false, starred: false, labels: [],
        id: (prevState.messages.reduce((max, el) => el.id > max ? el.id : max, 0) + 1) }] }))
  }

  render() {
    return (
      <div className="App">
      <Toolbar messages={this.state.messages} toggleSelectAll={this.toggleSelectAll}
        markReadUnread={this.markReadUnread} deleteMessages={this.deleteMessages}
        addLabel={this.addLabel} removeLabel={this.removeLabel} compose={this.compose} />
      <ComposeForm composing={this.state.composing} sendMessage={this.sendMessage} />
      <MessageList messages={this.state.messages} toggle={this.toggle} />
      </div>
    );
  }
}

export default App;
