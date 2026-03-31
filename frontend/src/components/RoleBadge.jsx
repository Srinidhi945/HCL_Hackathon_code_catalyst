import React from 'react'

const RoleBadge = ({ role }) => {
  if (!role) return null
  return <span className="badge">{role}</span>
}

export default RoleBadge
