import React from 'react'
import Labels from './Labels'

class Message extends React.Component {
  constructor (props) {
    super(props)
    this.state = { open: false }
  }

  render() {
    let messageBodyArea = ''
    if (this.state.open) {
      messageBodyArea = <div className="row message-body">
          <div className="col-xs-11 col-xs-offset-1">
            {this.props.message.body}
          </div>
        </div>
    }

    return (<div><div className=
      {`row message ${this.props.message.read ? 'read' : 'unread'} ${this.props.message.selected ? 'selected' : ''}`}>
    <div className="col-xs-1">
      <div className="row">
        <div className="col-xs-2">
          <input type="checkbox" checked={`${this.props.message.selected ? 'checked' : ''}`}
            onChange={() => this.props.toggle(this.props.message.id, 'selected')} />
        </div>
        <div className="col-xs-2">
          <i className={`star fa ${this.props.message.starred ? 'fa-star' : 'fa-star-o'}`}
            onClick={() => this.props.toggle(this.props.message.id, 'starred')}></i>
        </div>
      </div>
    </div>
    <div className="col-xs-11">
      <Labels labels={this.props.message.labels} />
      <a href="#" onClick={e => {
        e.preventDefault()
        this.setState(prevState => ({ open: prevState.open ? false : true }))
      }}>
        {this.props.message.subject}
      </a>
    </div>
  </div>
  {messageBodyArea}
  </div>)
  }
}

export default Message
