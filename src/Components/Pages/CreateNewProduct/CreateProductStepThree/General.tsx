import {useState} from 'react'
import priceImg from './../../../../app/Images/price.png'
import closeIcon from './../../../../app/Images/icons/close-circle.svg'

interface Props {
  productType: string
}
const General = (props: Props) => {
  const {productType} = props

  const [taxStatus, setTaxStatus] = useState<string>('1')
  const [taxClass, setTaxClass] = useState<string>('2')
  const [valueRegularPrice, setValueRegularPrice] = useState<string>('')
  const [valueSalePrice, setValueSalePrice] = useState<string>('')
  const [valueWalletCredit, setValueWalletCredit] = useState<string>('')
  const [valueWalletCashback, setValueWalletCashback] = useState<string>('')
  const [valueCommission, setValueCommission] = useState<string>('')

  const handleChangeTaxStatus = (e: any) => setTaxStatus(e.target.value)
  const handleChangeTaxClass = (e: any) => setTaxClass(e.target.value)

  const dataGeneralSelect = [
    {
      title: 'Tax Status',
      defaultSelect: taxStatus,
      onChange: handleChangeTaxStatus,
      options: [
        {
          value: '1',
          text: 'Taxable',
        },
        {
          value: '2',
          text: 'Shipping only',
        },
        {
          value: '3',
          text: 'None',
        },
      ],
    },
    {
      title: 'Tax class',
      defaultSelect: taxClass,
      onChange: handleChangeTaxClass,
      options: [
        {
          value: '1',
          text: 'Same as parent',
        },
        {
          value: '2',
          text: 'Standard',
        },
        {
          value: '3',
          text: 'Reduced rate',
        },
        {
          value: '4',
          text: 'Zero rate',
        },
      ],
    },
  ]

  const renderGeneralSelect = () =>
    dataGeneralSelect.map((select: any, index: number) => (
      <div className='general__select d-flex align-items-center' key={index}>
        <h3 className='general__title fw-medium m-0 me-3'>{select.title}</h3>
        <select
          className='product-type__select cursor-pointer'
          value={select.defaultSelect}
          onChange={select.onChange}>
          {select.options.map((option: any, index: number) => (
            <option value={option.value} key={index}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    ))

  const dataGeneralPrice = [
    {
      label: 'Regular Price ($)',
      name: 'regularPrice',
      id: 'regularPrice',
      value: valueRegularPrice,
      onChange: (e: any) => setValueRegularPrice(e.target.value),
      onRemoveValue: () => setValueRegularPrice(''),
    },
    {
      label: 'Sale Price ($)',
      name: 'salePrice',
      id: 'salePrice',
      value: valueSalePrice,
      onChange: (e: any) => setValueSalePrice(e.target.value),
      onRemoveValue: () => setValueSalePrice(''),
    },
  ]

  const renderGeneralPrice = () =>
    dataGeneralPrice.map((item: any, index: number) => (
      <div className='d-flex align-items-center' key={index}>
        <label htmlFor={item.id} className='general__title fw-medium m-0 me-3'>
          {item.label}
        </label>
        <div className='general__input-wrap d-flex align-items-center user-select-none'>
          <img src={priceImg} alt='price' />
          <div className='separator'></div>
          <input
            type='number'
            id={item.id}
            name={item.name}
            className='general__input w-100 h-100'
            value={item.value}
            onChange={item.onChange}
          />
          {item.value && (
            <img
              onClick={item.onRemoveValue}
              src={closeIcon}
              alt='close'
              className='close-img cursor-pointer'
            />
          )}
        </div>
      </div>
    ))

  const dataGeneralCard = [
    {
      label: 'Wallet Credit',
      name: 'walletCredit',
      id: 'walletCredit',
      type: 'text',
      value: valueWalletCredit,
      onChange: (e: any) => setValueWalletCredit(e.target.value),
    },
    {
      label: 'Wallet Cashback',
      name: 'walletCashback',
      id: 'walletCashback',
      type: 'text',
      value: valueWalletCashback,
      onChange: (e: any) => setValueWalletCashback(e.target.value),
    },
    {
      label: 'Commission',
      name: 'commission',
      id: 'commission',
      type: 'number',
      value: valueCommission,
      onChange: (e: any) => setValueCommission(e.target.value),
    },
  ]

  const renderGeneralCard = () =>
    dataGeneralCard.map((item: any, index: number) => (
      <div className='d-flex align-items-center' key={index}>
        <label htmlFor={item.id} className='general__title fw-medium m-0 me-3'>
          {item.label}
        </label>
        <div className='general__input-wrap d-flex align-items-center user-select-none'>
          <input
            type={item.type}
            id={item.id}
            name={item.name}
            className='general__input w-100 h-100'
            value={item.value}
            onChange={item.onChange}
          />
        </div>
      </div>
    ))

  return (
    <div className='d-flex justify-content-between'>
      <div className='general__left d-flex flex-column align-items-end'>
        {!productType && renderGeneralPrice()}
        {renderGeneralSelect()}
      </div>
      <div className='general__right d-flex flex-column align-items-end'>
        {renderGeneralCard()}
      </div>
    </div>
  )
}

export default General
