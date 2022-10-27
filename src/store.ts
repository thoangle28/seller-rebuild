import {profileReducer} from 'Components/Pages/Profile/Redux/reducer'
import {configureStore} from '@reduxjs/toolkit'
import {attributesReducer} from './Components/Pages/Attributes/Redux/reducer'
import {loginReducer} from './Components/Pages/Login/Redux/reducer'
import {registerReducer} from './Components/Pages/SignUp/Redux/reducer'
import {generalReducer} from './Components/Pages/DashBoard/redux/reducer'

const reducer = {
  loginReducer,
  registerReducer,
  attributesReducer,
  generalReducer,
  profileReducer,
}

export const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
