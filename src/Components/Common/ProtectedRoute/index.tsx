import { Navigate } from 'react-router-dom'

interface Props {
    children: JSX.Element[] | JSX.Element
}

const ProtectedRoute = (props: Props) => {
    const profile = localStorage.getItem('profile')
    if (!profile)
        return <Navigate to="/" replace />

    return <>{props.children}</>
}

export default ProtectedRoute