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
        <Header />
        <div className="container-wrapper">
          <div className="row">
            <div className="sidebar-wrapper col-lg-3 col-md-3">
              <div className="default-layout__sidebar">
                <Sidebar />
              </div>
              <div className="col-lg-9 col-md-9">
                {children}
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ProtectedRoute>
};

export default DefaultLayout;
