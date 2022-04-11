import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import MyContext from '.'
import axios from 'axios'

function Provider({children}) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [auth, setAuth] = useState(false)
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const URL = 'https://the-social-back.herokuapp.com/api/'

  useEffect(() => {
    const storageToken = localStorage.getItem('token')
    const storageUser = localStorage.getItem('user')
    if (storageToken && storageUser) {
      setToken(storageToken)
      setUser(JSON.parse(storageUser))
    }
  }
  , [])

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const res = await axios.get(`${URL}posts`)
    setPosts(res.data)
  }


  useEffect(() => {
    async function load() {
      axios.defaults.headers.common['Authorization'] = token;
      try{
        const load1 = await axios.post(`${URL}load`);
        if(load1.status === 200){
          setAuth(true);
        }
      }catch(err){
        setAuth(false);
      }
    }
    if (token) {
      load();
    }
  }, [token])

  const handleLogin = (token, user) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    setToken(token)
    setUser(user)
    setAuth(true)
  }

  const loginError = () => {
    setToken(null)
    setUser(null)
    setAuth(false)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    setAuth(false)
    navigate('/login')
  }
  

  const contextValue = {
    token,
    setToken,
    user,
    setUser,
    auth,
    setAuth,
    URL,
    handleLogin,
    posts,
    setPosts,
    loginError,
    fetchPosts,
    logout
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );

}

export default Provider