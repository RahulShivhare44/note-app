import React from 'react'
import Template from '../components/Template'
import loginImg from '../assets/login.png'

export default function Login({ setIsLoggedIn }) {
  return (
    <div>

      <Template
        title="Welcome Back"
        desc1="Create a note for today, tomorrow, and beyond."
        desc2="A note application is essential tool for anyone."
        image={loginImg}
        formtype="login"
        setIsLoggedIn={setIsLoggedIn}
      />

    </div>
  )
}
