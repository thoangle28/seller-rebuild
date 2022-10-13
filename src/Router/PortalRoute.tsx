import DashBoard from '../Components/Pages/DashBoard'
import Login from '../Components/Pages/Login'
import Signup from '../Components/Pages/SignUp'
import ForgotPassword from 'Components/Pages/ForgotPassword'
import NotFoundPage from '../Components/Pages/NotFoundPage'
import PasswordValidation from '../Components/Pages/PasswordValidation'
import Profile from 'Components/Pages/Profile'
import AccountSettings from 'Components/Pages/AccountSettings'

import {Routes, Route} from 'react-router-dom'

type Props = {}

const Router = (props: Props) => {
  return (
    <Routes>
      <Route path='/dashboard' element={<DashBoard />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/settings' element={<AccountSettings />} />
      <Route path='/dashboard' element={<DashBoard />} />
      <Route path='*' element={<NotFoundPage />} />
      <Route index element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/password-validation' element={<PasswordValidation />} />
    </Routes>
  )
}

export default Router
