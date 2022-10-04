import { FC } from "react";

interface Props {
  children: JSX.Element[] | JSX.Element
}

const DefaultLayout: FC<Props> = (props: Props) => {
  const { children } = props
  return <div className="container">
    <div className="row">
      <div className="col-sm-12 col-md-4 col-lg-4">
        <p>Side Bar Here</p>
      </div>
      <div className="col-sm-12 col-md-8 col-lg-8">
        {children}
      </div>
    </div>
  </div>;
};

export default DefaultLayout;
