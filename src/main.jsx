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
import Footer from './Footer'
import Societies from './Societies'
import Home from './Home'
//import WhatsOn from './WhatsOn'

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/society/:id" element={<Detail />} />
          <Route path="/societies" element={<Societies />} />
          {/* <Route path="/whatson" element={<WhatsOn />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)