import { iTableHead } from 'app/Models'
import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'

import './style.scss'

interface Props {
  children: JSX.Element | JSX.Element[],
  dataTableHead: iTableHead[],
  isLoading?: boolean
}

const Table: FC<Props> = (props: Props) => {
  const { dataTableHead, children, isLoading } = props

  //   Render table header
  const RenderTableHeader = () => {
    return (
      <thead>
        <tr>
          {dataTableHead.map((item) => (
            <th className={`${item.className} p-0 pb-4 px-2`} key={item.name}>
              {isLoading ? <Skeleton /> : item.name}
            </th>
          ))}
        </tr>
      </thead>
    )
  }

  return (
    <table className='table m-0 '>
      <RenderTableHeader />
      {children}
    </table>
  )
}

export default Table
