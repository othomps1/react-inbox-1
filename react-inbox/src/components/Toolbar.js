import React from 'react'

function Toolbar({ messages, toggleSelectAll, markReadUnread, deleteMessages, addLabel, removeLabel, compose }) {
  let numberUnread = messages.reduce((acc, message) => acc + (message.read ? 0 : 1), 0)
  let numberSelected = messages.reduce((acc, message) => acc + (message.selected ? 1 : 0), 0)
  let selectedCheckbox

  switch(numberSelected) {
    case 0:
      selectedCheckbox = 'fa fa-square-o'
      break
    case messages.length:
      selectedCheckbox = 'fa fa-check-square-o'
      break
    default:
      selectedCheckbox = 'fa fa-minus-square-o'
      break
  }

  return (<div className="row toolbar">
    <div className="col-md-12">
      <p className="pull-right">
        <span className="badge badge">{numberUnread}</span>
        unread message{numberUnread === 1 ? '': 's'}
      </p>

      <a className="btn btn-danger" onClick={() => {compose()}}>
        <i className="fa fa-plus"></i>
      </a>

      <button className="btn btn-default" onClick={() => {toggleSelectAll()}}>
        <i className={selectedCheckbox}></i>
      </button>

      <button className="btn btn-default" onClick={() => {markReadUnread(true)}}>
        Mark As Read
      </button>

      <button className="btn btn-default" onClick={() => {markReadUnread(false)}}>
        Mark As Unread
      </button>
  <select className="form-control label-select" onChange={(e) => {addLabel(e.target.value)}}>
    <option>Apply label</option>
    <option value="dev">dev</option>
    <option value="personal">personal</option>
    <option value="gschool">gschool</option>
  </select>

  <select className="form-control label-select" onChange={(e) => {removeLabel(e.target.value)}}>
    <option>Remove label</option>
    <option value="dev">dev</option>
    <option value="personal">personal</option>
    <option value="gschool">gschool</option>
  </select>

  <button className="btn btn-default" onClick={() => {deleteMessages()}}>
    <i className="fa fa-trash-o"></i>
  </button>
</div>
</div>)
}

export default Toolbar
