import { NavbarContextProvider } from './components/NavbarProvider'
import { Navbar } from './components/Navbar'
import { JLThemeProvider } from './theme'
import { Outlet, Routes, Route } from 'react-router-dom'

export const Portfolio = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <NavbarContextProvider>
          <JLThemeProvider>
            <Navbar>
              <Outlet />
            </Navbar>
          </JLThemeProvider>
          </NavbarContextProvider>
        }
      >
        <Route path="" element={<></>} />
        {/* child routes go here */}
      </Route>
    </Routes>
  )
}
