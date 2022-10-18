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
      <div className="row">
        <div className="container-wrapper">
          <div className="row">
            <div className="sidebar-wrapper col-lg-2 col-md-2 p-0">
              <div className="default-layout__sidebar">
                <Sidebar />
              </div>
            </div>
            <div className="page-content col-lg-10 col-md-10">
              <Header />
              <div className="content-wrapper p-3 pe-5">
                {children}
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  </ProtectedRoute>
};

export default DefaultLayout;
