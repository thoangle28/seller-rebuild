import { iUserProfile, iVerifyToken } from 'app/Models'
import { verifyToken } from 'Components/Pages/Login/Redux/action'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getUserProfile } from '../Sidebar/Redux/actions'
import { useAppDispatch, useAppSelector } from './../../../app/Hooks/hooks'
interface Props {
    children: JSX.Element[] | JSX.Element
}

const ProtectedRoute = (props: Props) => {
    const profile: any = JSON.parse(localStorage.getItem('profile') || '{}')
    const { isLogin } = useAppSelector(state => state.loginReducer)

    const accessToken = profile.access_token;
    const userId = profile.user.ID
    const userEmail = profile.user.user_email
    const dispatch = useAppDispatch()

    const payload: iVerifyToken = {
        access_token: accessToken,
        user_id: userId
    }
    const getUserProfilePayload: iUserProfile = {
        user_email: userEmail,
        user_id: userId
    }
    useEffect(() => {
        if (!isLogin) {
            dispatch(verifyToken(payload))
            dispatch(getUserProfile(getUserProfilePayload))
        }
    }, [userId])


    // if (!access_token && !user) {
    //     //dispatch(user ...)
    // }

    if (!profile)
        return <Navigate to="/" replace />

    return <>{props.children}</>
}

export default ProtectedRoute