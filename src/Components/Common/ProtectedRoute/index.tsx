import { iVerifyToken } from 'app/Models'
import { verifyToken } from 'Components/Pages/Login/Redux/action'
import { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './../../../app/Hooks/hooks'


const ProtectedRoute = () => {

    const { user, accessToken, isLogin } = useAppSelector(state => state.loginReducer, shallowEqual)
    const currentUserId: number = user ? user.ID : 0

    const dispatch = useAppDispatch()
 
    const requestData = () => {
        if (!currentUserId) return;
        const payload: iVerifyToken = {
            access_token: accessToken,
            user_id: currentUserId.toString()
        }
        dispatch(verifyToken(payload))
    }

    useEffect(() => {
        requestData()
    }, [])

    return <>{isLogin ? <Outlet /> : <Navigate to={'/'} replace />}</>
}

export default ProtectedRoute