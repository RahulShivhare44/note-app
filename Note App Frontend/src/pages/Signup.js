import React from 'react'
import Template from '../components/Template'
import signupImg from '../assets/signup.png'

export default function Signup({ setIsLoggedIn }) {
  return (
    <div>
      <Template
        title="Join the millions people to write a note with GoodNotes for free"
        desc1="Create a note for today, tomorrow, and beyond."
        desc2="A note application is essential tool for anyone."
        image={signupImg}
        formtype="signup"
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  )
}
