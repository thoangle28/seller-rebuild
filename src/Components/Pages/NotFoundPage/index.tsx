import DefaultLayout from 'Components/Layouts/DefaultLayout'
import { FC } from 'react'
type Props = {}

const NotFoundPage: FC = (props: Props) => {
    return (
        <DefaultLayout>
            <h1>Sorry Page Not Found</h1>
        </DefaultLayout>
    )
}

export default NotFoundPage