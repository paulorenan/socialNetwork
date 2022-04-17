import React, { useContext } from 'react';
import HeaderAuth from './HeaderAuth';
import HeaderNotAuth from './HeaderNotAuth';
import MyContext from '../Context';

const Header = () => {
  const { auth } = useContext(MyContext);
  return (
    <>
      {auth ? <HeaderAuth /> : <HeaderNotAuth />}
    </>
  );
};
export default Header;