import React from 'react'
import { Children } from 'react';
import { createContext, useState } from 'react'

//create Ccontext
export const MessageContext = createContext();

//2.create Provider
export const MessageProvider = ({children}) =>{
    const[message, setMessage] = useState("Hello World");

    return(
        <MessageContext.Provider value={{message, setMessage}}>
            {children}
        </MessageContext.Provider>
    )
}