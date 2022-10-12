import { FC } from "react";
import Header from "./Header";
import Footer from './Footer';
import Sidebar from "Components/Common/Sidebar";
import './style.scss'
interface Props {
  children: JSX.Element[] | JSX.Element
}

const DefaultLayout: FC<Props> = (props: Props) => {
  const { children } = props
  return <div className="default-layout container-fluid min-vh-100" >
    <div className="row">
      <div className="col-md-2 col-lg-2 ps-0 pe-0">
        <div className="default-layout__sidebar">
          <Sidebar />
        </div>

      </div>
      <div className="col-md-10 col-lg-10 ps-0 pe-0">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  </div>;
};

export default DefaultLayout;
