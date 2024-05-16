import { NavbarContextProvider } from './components/Nav/NavbarProvider'
import { Navbar } from './components/Nav/Navbar'
import { JLThemeProvider } from './theme'
import { Outlet, Routes, Route } from 'react-router-dom'
import { Paths } from './utils/paths'
import { Timer } from './pages/Timer'

export const Portfolio = () => {
  return (
    <Routes>
      <Route
        path={Paths.ABSOLUTE_HOME}
        element={
          <JLThemeProvider>
          <NavbarContextProvider>
              <Navbar>
                <Outlet />
              </Navbar>
          </NavbarContextProvider>
        </JLThemeProvider>
        }
        >
        <Route path={Paths.RELATIVE_HOME} element={<></>} />
        <Route path={Paths.RELATIVE_TIMER} element={<Timer />} />
        {/* child routes go here */}
      </Route>
    </Routes>
  )
}
