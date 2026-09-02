import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './Header'
import Detail from './Detail'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Detail />
  </StrictMode>,
)
