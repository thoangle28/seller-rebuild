import { iUserProfile, iVerifyToken } from 'app/Models'
import { logout, verifyToken } from 'Components/Pages/Login/Redux/action'
import { useEffect } from 'react'
import { Outlet, useNavigate, } from 'react-router-dom' 
import { getUserProfile } from '../Sidebar/Redux/actions'
import { useAppDispatch } from './../../../app/Hooks/hooks'


const ProtectedRoute = () => {
    const navigate = useNavigate()
    const profile: any = JSON.parse(localStorage.getItem('profile') || '{}')
    const accessToken = profile.access_token;
    const userId: string = profile.user?.ID || ''
    const userEmail: string = profile.user?.user_email || ''
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (userId) {
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
        } else {
            dispatch(logout())
            navigate('/')
        }
    }, [userId])


    return <><Outlet /></>
}

export default ProtectedRoute