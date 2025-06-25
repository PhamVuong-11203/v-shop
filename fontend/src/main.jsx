import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ShopeContextProvider from './context/ShopContext'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ShopeContextProvider>
        <App />
      </ShopeContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
