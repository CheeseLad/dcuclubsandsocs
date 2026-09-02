import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from 'react-router'

import Header from './Header'
import Detail from './Detail'

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<div></div>} />
          <Route path="/society/:id" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)