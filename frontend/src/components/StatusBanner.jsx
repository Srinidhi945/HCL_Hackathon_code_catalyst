import React from 'react'

const StatusBanner = ({ tone = 'info', message }) => {
  if (!message) return null
  return <div className={`banner banner-${tone}`}>{message}</div>
}

export default StatusBanner
