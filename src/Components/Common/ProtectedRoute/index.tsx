import { iVerifyToken } from 'app/Models'
import { logout, verifyToken } from 'Components/Pages/Login/Redux/action'
import { useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { Outlet, useNavigate, } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './../../../app/Hooks/hooks'


const ProtectedRoute = () => {
    const navigate = useNavigate()

    const { user, accessToken, expireDate } = useAppSelector(state => state.loginReducer, shallowEqual)
    const currentUserId: number = user ? user.ID : 0

    const dispatch = useAppDispatch()

    useEffect(() => {
        const requestData = () => {
            const payload: iVerifyToken = {
                access_token: accessToken,
                user_id: currentUserId.toString()
            }
            dispatch(verifyToken(payload))
        }

        const currentDate: number = Date.now();

        if (accessToken && parseInt(expireDate) < currentDate && currentUserId) {
            requestData() 
        } else {
            dispatch(logout())
            navigate('/')
        }
    }, [])

    return <><Outlet /></>
}

export default ProtectedRoute