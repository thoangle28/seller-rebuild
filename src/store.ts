import { configureStore } from '@reduxjs/toolkit'
import { loginReducer } from 'Components/Pages/Login/Redux/reducer' 
import { registerReducer } from 'Components/Pages/SignUp/Redux/reducer'

const reducers = {
    loginReducer,
    registerReducer
}

export const store = configureStore({
    reducer: reducers
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
