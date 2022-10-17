import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {iTableHead, iTableBody} from 'app/Models'
export const dataTableHead: iTableHead[] = [
  {
    name: '#ID',
    className: 'text-center',
  },
  {
    name: 'Product Name',
    className: 'text-left',
  },
  {
    name: 'Type',
    className: 'text-center',
  },
  {
    name: 'SKU',
    className: 'text-center',
  },
  {
    name: 'Price',
    className: 'text-center',
  },
  {
    name: 'Date',
    className: 'text-center',
  },
  {
    name: 'Status',
    className: 'text-center',
  },
  {
    name: 'Actions',
    className: 'text-center',
  },
]

export const dataTableBody: iTableBody[] = [
  {
    id: '123456',
    productImg:
      'https://i.ex-cdn.com/mgn.vn/files/content/2022/05/28/1-0120.jpg',
    productName: 'Anya Forger',
    productDesc: 'Storage Solution, Kitchen Mixers and Taps',
    type: 'Simple',
    sku: 'test',
    price: {old: 20, new: 10},
    date: '1/10/2022',
    status: 'darft',
    actions: <FontAwesomeIcon icon={faPenToSquare} />,
  },
  {
    id: '111113',
    productImg:
      'https://i.ex-cdn.com/mgn.vn/files/content/2022/05/28/1-0120.jpg',
    productName: 'Anya Forger',
    productDesc: 'Storage Solution, Kitchen Mixers and Taps',
    type: 'Simple',
    sku: 'test',
    price: {old: 20, new: 10},
    date: '1/10/2022',
    status: 'pending',
    actions: <FontAwesomeIcon icon={faPenToSquare} />,
  },
  {
    id: '158521',
    productImg:
      'https://i.ex-cdn.com/mgn.vn/files/content/2022/05/28/1-0120.jpg',
    productName: 'Anya Forger',
    productDesc: 'Storage Solution, Kitchen Mixers and Taps',
    type: 'Simple',
    sku: 'test',
    price: {old: 20, new: 10},
    date: '1/10/2022',
    status: 'pending',
    actions: <FontAwesomeIcon icon={faPenToSquare} />,
  },
  {
    id: '147893',
    productImg:
      'https://i.ex-cdn.com/mgn.vn/files/content/2022/05/28/1-0120.jpg',
    productName: 'Anya Forger',
    productDesc: 'Storage Solution, Kitchen Mixers and Taps',
    type: 'Simple',
    sku: 'test',
    price: {old: 20, new: 10},
    date: '1/10/2022',
    status: 'pending',
    actions: <FontAwesomeIcon icon={faPenToSquare} />,
  },
]
