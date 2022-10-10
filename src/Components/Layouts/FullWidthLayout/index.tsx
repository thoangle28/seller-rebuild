import {FC} from 'react'
import './style.scss'
import logo from './../../../app/Images/Addin.png'
interface Props {
  children: JSX.Element[] | JSX.Element
}

const FullWidthLayout: FC<Props> = (props: Props) => {
  const {children} = props
  return (
    <div className='main-content container-fluid p-0 m-0 min-vh-100 d-flex flex-column align-items-center'>
      <img src={logo} alt='logo' className='logo' />
      {children}
    </div>
  )
}
export default FullWidthLayout
