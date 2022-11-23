import { profileReducer } from 'Components/Pages/Profile/Redux/reducer'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { attributesReducer } from './Components/Pages/Attributes/Redux/reducer'
import { loginReducer } from './Components/Pages/Login/Redux/reducer'
import { registerReducer } from './Components/Pages/SignUp/Redux/reducer'
import { generalReducer } from './Components/Pages/DashBoard/redux/reducer'
import storage from 'redux-persist/lib/storage'
import { tableReducer } from './Components/Common/Table/Redux/reducer'
import getDataSlice from 'Components/Pages/Login/ReduxToolkit/slice'

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginReducer'],
}

const reducer = combineReducers({
  loginReducer,
  registerReducer,
  attributesReducer,
  generalReducer,
  profileReducer,
  tableReducer,
  getDataSlice: getDataSlice.reducer
}) 

const pReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: pReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch
export const persistor: any = persistStore(store)
