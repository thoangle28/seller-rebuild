import { iUserProfile, iVerifyToken } from 'app/Models'
import { verifyToken } from 'Components/Pages/Login/Redux/action'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getUserProfile } from '../Sidebar/Redux/actions'
import { useAppDispatch } from './../../../app/Hooks/hooks'
interface Props {
    children: JSX.Element[] | JSX.Element
}

const ProtectedRoute = (props: Props) => {
    const profile: any = JSON.parse(localStorage.getItem('profile') || '{}')

    const accessToken = profile.access_token;
    const userId = profile.user.ID
    const userEmail = profile.user.user_email
    const dispatch = useAppDispatch()

    useEffect(() => {
        const payload: iVerifyToken = {
            access_token: accessToken,
            user_id: userId
        }
        const getUserProfilePayload: iUserProfile = {
            user_email: userEmail,
            user_id: userId
        }
        dispatch(verifyToken(payload))
        dispatch(getUserProfile(getUserProfilePayload))
    }, [])

    // const { access_token, user, expire_time } = useAppSelector(state => state.loginReducer.user)

    // if (!access_token && !user) {
    //     //dispatch(user ...)
    // }

    if (!profile)
        return <Navigate to="/" replace />

    return <>{props.children}</>
}

export default ProtectedRoute