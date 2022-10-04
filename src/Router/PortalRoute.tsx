import DashBoard from "../Components/Pages/DashBoard";
import Login from "../Components/Pages/Login";
import Signup from '../Components/Pages/SignUp'
import ForgotPassword from "Components/Pages/ForgotPassword";
import NotFoundPage from '../Components/Pages/NotFoundPage';

import { Routes, Route } from "react-router-dom";

type Props = {}

const Router = (props: Props) => {
    return (
        <Routes>
            <Route index element={<DashBoard />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

        </Routes>
    )
}

export default Router