export interface iTableHead {
  name: string
  className: string
}

export interface iTableBody {
  id: string
  productImg: string
  productName: string
  productDesc: string
  type: string
  sku: string
  price: {old: number; new: number}
  date: string
  status: 'pending' | 'draft'
  actions: JSX.Element
}
