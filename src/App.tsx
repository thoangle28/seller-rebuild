import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Router from './Router/PortalRoute'

const App: FC = () => {

  return <>
    <Router />
    <Outlet />
  </>
}

export default App