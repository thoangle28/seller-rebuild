import { Navigate } from 'react-router-dom'

interface Props {
    children: JSX.Element[] | JSX.Element
}

const ProtectedRoute = (props: Props) => {
    const user = localStorage.getItem('user')
    if (!user)
        return <Navigate to="/login" replace />
    return <>{props.children}</>
}

export default ProtectedRoute