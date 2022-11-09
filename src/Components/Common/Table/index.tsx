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
            <th className={`${item.className} p-0 pb-4`} key={item.name}>
              {isLoading ? <div className='px-3'><Skeleton /></div> : item.name}
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
