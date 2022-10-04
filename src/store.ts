import { configureStore } from '@reduxjs/toolkit'
import { loginReducer } from 'Components/Pages/Login/Redux/reducer'

export default configureStore({
    reducer: {
        loginReducer
    }
})