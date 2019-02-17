import React from 'react'

function Labels({ labels }) {
  return labels.map((label, i) => <span className="label label-warning" key={i}>{label}</span>)
}

export default Labels
