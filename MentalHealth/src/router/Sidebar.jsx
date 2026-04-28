import React, { useContext } from 'react'
import AuthProvider from '../Context.jsx/AuthProvider'

const Sidebar = () => {
    const {user, login, logout, item, getItem, handledelete, handleEdit, addDairy} = useContext(AuthProvider);
  return (
    <>

    </>
  )
}

export default Sidebar