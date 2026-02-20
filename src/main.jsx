import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { TaskProvider } from './context/BillContext'
import { UserProvider } from './context/UserContext'
import Router from './router/Router.jsx'
import './App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TaskProvider>
          <Router/>
        </TaskProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
