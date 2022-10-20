import {configureStore} from '@reduxjs/toolkit'
import {attributesReducer} from './Components/Pages/Attributes/Redux/reducer'
import {loginReducer} from 'Components/Pages/Login/Redux/reducer'
import {registerReducer} from 'Components/Pages/SignUp/Redux/reducer'

const reducers = {
  loginReducer,
  registerReducer,
  attributesReducer,
}

export const store = configureStore({
  reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
