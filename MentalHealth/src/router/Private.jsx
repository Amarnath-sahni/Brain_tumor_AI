import React, { useContext } from 'react'
import { AuthContext } from '../Context.jsx/AuthProvider';

const Private = () => {
    const {user, login} = useContext(AuthContext);

  return (
    <>
    
    </>
  )
}

export default Private