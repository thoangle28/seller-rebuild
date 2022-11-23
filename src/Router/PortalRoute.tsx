import {Suspense, FC} from 'react'
import NotFoundPage from '../Components/Pages/NotFoundPage'

import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from 'Components/Common/ProtectedRoute'

// const Profile = lazy(() => import('../Components/Pages/Profile'))
// const Login = lazy(() => import('../Components/Pages/Login'))
// const SignUp = lazy(() => import('../Components/Pages/SignUp'))
// const ForgotPassword = lazy(() => import('../Components/Pages/ForgotPassword'))
// const AccountSettings = lazy(
//   () => import('../Components/Pages/AccountSettings')
// )
// const ProductListing = lazy(() => import('../Components/Pages/ProductListing'))
// const Attributes = lazy(() => import('../Components/Pages/Attributes'))

import Profile from '../Components/Pages/Profile'
import Login from '../Components/Pages/Login'
import AccountSettings from 'Components/Pages/AccountSettings'
import SignUp from 'Components/Pages/SignUp'
import ForgotPassword from 'Components/Pages/ForgotPassword'
import ProductListing from 'Components/Pages/ProductListing'
import Attributes from 'Components/Pages/Attributes'
import DashBoard from 'Components/Pages/DashBoard'
import CreateNewProduct from 'Components/Pages/CreateNewProduct'
import Example from 'Components/Pages/Login/Example'

const Router: FC = () => {
  return (
    <Suspense>
      <Routes>
        {/* Declare Private Routes Here */}
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/my-profile' element={<Profile />} />
          <Route path='/settings' element={<AccountSettings />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/Attributes' element={<Attributes />} />
          <Route path='/product-listing' element={<ProductListing />} />
          <Route path='/create-new-product' element={<CreateNewProduct />} />
        </Route>
        {/* Declare Public Routes Here */}
        <Route index element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/test' element={<Example />} />
      </Routes>
    </Suspense>
  )
}

export default Router
