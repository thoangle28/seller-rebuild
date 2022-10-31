import {FC} from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from 'Components/Common/Sidebar'
import './style.scss'
interface Props {
  children: JSX.Element[] | JSX.Element
}

const DefaultLayout: FC<Props> = (props: Props) => {
  const {children} = props
  return (
    <div className='default-layout min-vh-100'>
      <div className='container-wrapper d-flex'>
        <div className='sidebar-wrapper'>
          <div className='default-layout__sidebar'>
            <Sidebar />
          </div>
        </div>
        <div className='page-content'>
          <Header />
          <div className='content-wrapper min-vh-100'>{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
export default DefaultLayout
