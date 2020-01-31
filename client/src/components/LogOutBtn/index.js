import React from "react"
import cookie from 'react-cookies'

const LogOutBtn = () => {
  const handleClick = () => {
    cookie.remove("jwt_token")
    window.location.assign("/")
  }
   
  return (
    <div>
      <button onClick={handleClick}>Log Out</button>
    </div>
  )
}
export default LogOutBtn;