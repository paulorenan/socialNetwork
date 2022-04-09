import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

  let navigate = useNavigate()

  return (
    <div>Home
    <button
      onClick={() => {
        navigate('/profile')
      }}
    >
      Oi
    </button>
    </div>
  )
}

export default Home