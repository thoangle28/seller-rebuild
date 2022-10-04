import { FC } from "react";
import { Routes, useRoutes } from "react-router-dom";
import DashBoard from "../../Pages/DashBoard";
import Login from "../../Pages/Login";

interface Props {
    exampleString?: any
}

const Navigation: FC<Props> = (props: Props) => {
    const routes = useRoutes([
        {
            path: '/',
            element: <DashBoard />
        },
        {
            path: '/login',
            element: <Login />
        }
    ])
    return (
        <Routes>
            {routes}
        </Routes>
    )
}

export default Navigation