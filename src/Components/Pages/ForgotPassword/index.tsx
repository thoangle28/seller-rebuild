import FullWidthLayout from 'Components/Layouts/FullWidthLayout'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

const ForgotPassword: FC = (props: Props) => {
    const navigate = useNavigate();

    return (
        <FullWidthLayout>
            <p>
                ForgotPassword
            </p>
            <button onClick={() => navigate('/login')}>Back To Login</button>
        </FullWidthLayout>
    )
}

export default ForgotPassword