import {iTableHead} from 'app/Models'
import {FC} from 'react'

import './style.scss'

type Props = {
  children: JSX.Element | JSX.Element[]
  dataTableHead: iTableHead[]
}

const Table: FC<Props> = (props: Props) => {
  const {dataTableHead, children} = props

  //   Render table header
  const RenderTableHeader = () => {
    return (
      <thead>
        <tr>
          {dataTableHead.map((item) => (
            <th className={`${item.className} p-0 pb-4`} key={item.name}>
              {item.name}
            </th>
          ))}
        </tr>
      </thead>
    )
  }

  return (
    <table className='table m-0'>
      <RenderTableHeader />
      {children}
    </table>
  )
}

export default Table
