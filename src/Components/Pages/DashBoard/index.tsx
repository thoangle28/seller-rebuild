import { FC } from 'react'
import ProtectedRoute from '../../Common/ProtectedRoute'

type Props = {}

const DashBoard: FC<Props> = (props: Props) => {
    return (
        <ProtectedRoute>
            <div>DashBoard</div>
        </ProtectedRoute>
    )
}

export default DashBoard