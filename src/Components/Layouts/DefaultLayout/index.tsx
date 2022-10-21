import {FC, useEffect} from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from 'Components/Common/Sidebar'
import './style.scss'
import ProtectedRoute from 'Components/Common/ProtectedRoute'
interface Props {
  children: JSX.Element[] | JSX.Element
}

const DefaultLayout: FC<Props> = (props: Props) => {
  const {children} = props
  useEffect(() => {}, [])
  return (
    <ProtectedRoute>
      <div className='default-layout min-vh-100'>
        <div className='container-wrapper d-flex'>
          <div className='sidebar-wrapper'>
            <div className='default-layout__sidebar'>
              <Sidebar />
            </div>
          </div>
          <div className='page-content'>
            <Header />
            <div className='content-wrapper'>{children}</div>
            <Footer />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default DefaultLayout
