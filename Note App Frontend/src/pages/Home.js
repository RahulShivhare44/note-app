import React from 'react'
import { Link } from 'react-router-dom'

export default function Home({ isLoggedIn }) {
  return (
    <div className='flex justify-center items-center text-white text-3xl h-full'>
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Your Note App</h1>
        <p className="text-lg mb-8">Capture your thoughts, anytime, anywhere.</p>
        <Link to='/login'>
          <button className="bg-white text-richblack-800 py-2 px-6 rounded-full font-bold hover:bg-richblack-100">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  )
}
