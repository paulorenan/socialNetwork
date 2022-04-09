import React, {useState, useEffect} from 'react'
import MyContext from '.'

function Provider({children}) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    const storageToken = localStorage.getItem('token')
    const storageUser = localStorage.getItem('user')
    if (storageToken && storageUser) {
      setToken(storageToken)
      setUser(JSON.parse(storageUser))
    }
  }
  , [])

  const contextValue = {
    token,
    setToken,
    user,
    setUser,
    auth,
    setAuth
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );

}

export default Provider