import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MessageProvider } from './Context.jsx/MessageContext.jsx'
import {AuthProvider} from './Context.jsx/AuthProvider.jsx'
import { ThemeProvider } from './Context.jsx/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MessageProvider>
      <AuthProvider>
      <ThemeProvider>
         <App />
      </ThemeProvider>
      </AuthProvider>
    </MessageProvider>
  </StrictMode>,
)
