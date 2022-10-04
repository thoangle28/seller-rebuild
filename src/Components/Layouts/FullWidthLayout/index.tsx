import { FC } from "react";
import './style.scss'

interface Props {
  children: JSX.Element[] | JSX.Element
}

const FullWidthLayout: FC<Props> = (props: Props) => {
  const { children } = props
  return <div className="main-content container-fluid p-0 m-0 min-vh-100">
    {children} 
  </div>
}
export default FullWidthLayout
