import React, {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import MyContext from '../Context'
import axios from 'axios'
import Header from '../components/Header'

function Profile() {
  const { nickname } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const {URL} = useContext(MyContext)

  useEffect(() => {
    setLoading(true)
    axios.get(`${URL}users/${nickname}`)
      .then(res => {
        setUser(res.data)
        setLoading(false)
      }).catch(() => {
        setError(true)
        setLoading(false)
      });
  }, [nickname, URL])

  return (
    <div>
      <Header />
      {loading ? null : error ? <h1>User not found</h1> : (
        <div>
          <h1>{user.name}</h1>
          <h2>@{user.nickName}</h2>
        </div>
      )}
    </div>
  )
}

export default Profile