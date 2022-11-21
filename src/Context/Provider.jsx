import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import MyContext from '.'
import axios from 'axios'

function Provider({children}) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [auth, setAuth] = useState(false)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  // const URL = 'http://localhost:5432/api/'
  // const URL = 'https://the-social-back.herokuapp.com/api/'
  const URL = 'https://social-back.vercel.app/api/'
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

  useEffect(() => {
    const storageToken = localStorage.getItem('token')
    const storageUser = localStorage.getItem('user')
    if (storageToken && storageUser) {
      setToken(storageToken)
      setUser(JSON.parse(storageUser))
    }
    fetchPosts(10)
  }, [])

  async function fetchPosts(limit) {
    const res = await axios.get(`${URL}posts?limit=${limit}`)
    setPosts(res.data)
  }


  useEffect(() => {
    const storageToken = localStorage.getItem('token')
    async function load() {
      setLoading(true)
      axios.defaults.headers.common['Authorization'] = storageToken;
      try{
        const load1 = await axios.post(`${URL}load`);
        if(load1.status === 200){
          setAuth(true);
          localStorage.setItem('user', JSON.stringify(load1.data.user));
          setUser(load1.data.user);
          setLoading(false);
        }
      }catch(err){
        setAuth(false);
        setLoading(false);
      }
    }
    if (storageToken) {
      load();
    } else {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    if (auth) {
      axios.defaults.headers.common['Authorization'] = token;
    }
  }, [auth, token]);

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
  
  const fetchLoad = async () => {
    try{
      const load1 = await axios.post(`${URL}load`);
      if(load1.status === 200){
        setAuth(true);
        localStorage.setItem('user', JSON.stringify(load1.data.user));
        setUser(load1.data.user);
      };
    }catch(err){
      setAuth(false);
    }
  };

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
    axios,
    logout,
    CLIENT_ID,
    fetchLoad,
    loading,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );

}

export default Provider