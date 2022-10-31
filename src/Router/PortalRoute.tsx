import {lazy, Suspense} from 'react'
import Login from '../Components/Pages/Login'
import Signup from '../Components/Pages/SignUp'
import ForgotPassword from 'Components/Pages/ForgotPassword'
import NotFoundPage from '../Components/Pages/NotFoundPage'

import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from 'Components/Common/ProtectedRoute'
import FallBack from 'Components/Common/Fallback'

const Dashboard = lazy(() => import('../Components/Pages/DashBoard'))
const Profile = lazy(() => import('../Components/Pages/Profile'))
const AccountSettings = lazy(
  () => import('../Components/Pages/AccountSettings')
)
const ProductListing = lazy(() => import('../Components/Pages/ProductListing'))
const Attributes = lazy(() => import('../Components/Pages/Attributes'))

type Props = {}

const Router = (props: Props) => {
  return (
    <Suspense fallback={<FallBack />}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<AccountSettings />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/Attributes' element={<Attributes />} />
          <Route path='/product-listing' element={<ProductListing />} />
        </Route>
        <Route index element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </Suspense>
  )
}

export default Router
