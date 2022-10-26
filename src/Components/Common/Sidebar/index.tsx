import { FC, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartSimple,
  faList,
  faPlus,
  faToggleOn,
  faUser,
  faChartLine,
  faGear,
} from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from './../../../app/Hooks/hooks'
import { logout } from 'Components/Pages/Login/Redux/action'
import triangle from './../../../app/Images/triangle.png'
interface iMenu {
  icon?: any
  name: string
  path: string
}

const sideMenu: iMenu[] = [
  { icon: faChartSimple, name: 'Dashboard', path: '/dashboard' },
  { icon: faList, name: 'Product Listing', path: '/product-listing' },
  { icon: faPlus, name: 'Create New Product', path: '/new-product' },
  { icon: faToggleOn, name: 'Attributes', path: '/attributes' },
  { icon: faChartLine, name: 'Sale Reports', path: '/sale-reports' },
]

const bottomMenu: iMenu[] = [
  { icon: faUser, name: 'My Profile', path: '/profile' },
  { icon: faGear, name: 'Account Settings', path: '/settings' },
]

const Sidebar: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const [isDisplaying, setIsDisplaying] = useState<boolean>(false)
  const { user } = useAppSelector(state => state.loginReducer)
  const { avatar ,display_name } = user

  const displayProfileMenu = () => {
    setIsDisplaying(!isDisplaying)
  }

  const renderSidemenu = (menu: iMenu[]) => {
    return menu.map((item, i: number) => (
      <li
        key={i}
        className={`cursor-pointer sidebar__list-item ${pathname === item.path ? 'active' : ''
          }`}>
        <p
          className='d-flex align-items-center'
          onClick={() => navigate(item.path)}>
          <FontAwesomeIcon
            width={20}
            height={22.75}
            className='item-icon'
            icon={item.icon}
          />{' '}
          <span className='d-inline-block'>{item.name}</span>
        </p>
      </li>
    ))
  }

  const renderProfileMenu = () => {
    return isDisplaying ? (
      <div className='sidebar__navigation pb-4'>
        <ul className='sidebar__list ps-0'>{renderSidemenu(bottomMenu)}</ul>
        <button
          onClick={signOut}
          className='signout-button btn btn-primary'>
          Sign Out
        </button>
      </div>
    ) : (
      <></>
    )
  }

  // Logout Action
  const signOut = () => {
    dispatch(logout)
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className='sidebar d-flex flex-column align-items-center bg-light min-vh-100'>
      <div className='sidebar__avatar d-flex  align-items-center flex-column'>
        <div className='user-avatar'>
          <img
            src={ avatar ? avatar : 'https://via.placeholder.com/100' }
            className='rounded-circle'
            alt='avatar'
          />
        </div>
        <div className='user-name d-flex justify-content-center align-items-center'>
          <p className='mb-0'>{display_name}</p>
          <img
            className='cursor-pointer ps-3'
            onClick={displayProfileMenu}
            src={triangle}
            alt='triangle'
          />
        </div>
      </div>
      <div className='seperator'></div>
      {renderProfileMenu()}
      <div className='seperator'></div>
      <div className='sidebar__navigation'>
        <ul className='sidebar__list ps-3'>{renderSidemenu(sideMenu)}</ul>
      </div>
    </div>
  )
}

export default Sidebar
