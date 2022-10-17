import { FC, useEffect } from "react";
import Header from "./Header";
import Footer from './Footer';
import Sidebar from "Components/Common/Sidebar";
import './style.scss'
import ProtectedRoute from "Components/Common/ProtectedRoute";
interface Props {
  children: JSX.Element[] | JSX.Element
}

const DefaultLayout: FC<Props> = (props: Props) => {
  const { children } = props
  useEffect(() => {

  }, [])
  return <ProtectedRoute>
    <div className="default-layout container-fluid min-vh-100" >
      <div className="container-wrapper">
        <div className="bg-img"></div>
        <div className="row">
          <div className="sidebar-wrapper col-lg-3 col-md-3">
            <div className="default-layout__sidebar">
              <Sidebar />
            </div>
          </div>
          <div className="page-content col-lg-9 col-md-9 ps-3 pe-0">
            <Header />
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  </ProtectedRoute>
};

export default DefaultLayout;
