import {useState, useRef, useEffect} from 'react'
import {useOnClickOutside} from 'app/Hooks/UseClickOutSide'
import closeIcon from './../../../../app/Images/icons/close-no-border.svg'
import closeCircleIcon from './../../../../app/Images/icons/close-circle.svg'

const LinkedProducts = () => {
  const [loadingUpsells, setLoadingUpsells] = useState<boolean>(false)
  const [productListUpsells, setProductListUpsells] = useState<any[]>([])
  const [showProductListUpsells, setShowProductListUpsells] =
    useState<boolean>(false)
  const [productSelectUpsells, setProductSelectUpsells] = useState<any[]>([])

  const [loadingCrossSells, setLoadingCrossSells] = useState<boolean>(false)
  const [productListCrossSells, setProductListCrossSells] = useState<any[]>([])
  const [showProductListCrossSells, setShowProductListCrossSells] =
    useState<boolean>(false)
  const [productSelectCrossSells, setProductSelectCrossSells] = useState<any[]>(
    []
  )

  const selectListUpsellsRef = useRef<HTMLDivElement>(null)
  const selectListCrossSellsRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(selectListUpsellsRef, () => {
    setShowProductListUpsells(false)
  })
  useOnClickOutside(selectListCrossSellsRef, () => {
    setShowProductListCrossSells(false)
  })

  const dataProductListUpsells = [
    {
      id: 1,
      productName: 'te1st',
    },
    {
      id: 2,
      productName: 'test1 test',
    },
    {
      id: 3,
      productName: 'test test1 test',
    },
    {
      id: 4,
      productName: 'test1',
    },
    {
      id: 5,
      productName: 'tes1t test1',
    },
    {
      id: 6,
      productName: 'test te2st test1',
    },
    {
      id: 7,
      productName: 'test test test1',
    },
  ]
  const dataProductListCrossSells = [
    {
      id: 1,
      productName: '2  te1st',
    },
    {
      id: 2,
      productName: '2 test1 test',
    },
    {
      id: 3,
      productName: '2 test test1 test',
    },
    {
      id: 4,
      productName: '2 test1',
    },
    {
      id: 5,
      productName: '2 tes1t test1',
    },
    {
      id: 6,
      productName: '2 test te2st test1',
    },
    {
      id: 7,
      productName: '2 test test test1',
    },
  ]

  const handleShowProductListUpsells = () => {
    if (productListUpsells.length > 0 || productSelectUpsells.length > 0) {
      return setShowProductListUpsells(true)
    } else {
      setShowProductListUpsells(true)
      setLoadingUpsells(true)
      const data = new Promise<any>((resolve) => {
        setTimeout(() => resolve(dataProductListUpsells), 2000)
      })

      data
        .then((data) => {
          setProductListUpsells(data)
          renderProductListUpsells()
        })
        .catch((err) => console.log(err))
        .finally(() => setLoadingUpsells(false))
    }
  }

  const handleShowProductListCrossSells = () => {
    if (
      productListCrossSells.length > 0 ||
      productSelectCrossSells.length > 0
    ) {
      return setShowProductListCrossSells(true)
    } else {
      setShowProductListCrossSells(true)
      setLoadingCrossSells(true)
      const data = new Promise<any>((resolve) => {
        setTimeout(() => resolve(dataProductListCrossSells), 2000)
      })

      data
        .then((data) => {
          setProductListCrossSells(data)
          renderProductListCrossSells()
        })
        .catch((err) => console.log(err))
        .finally(() => setLoadingCrossSells(false))
    }
  }

  const handleChangeProductSelectUpsells = (
    productName: string,
    id: number
  ) => {
    const newProductListUpsells = productListUpsells.filter(
      (item) => item.productName !== productName
    )

    setProductSelectUpsells((pre) => [...pre, {id, productName}])

    setProductListUpsells(newProductListUpsells)
  }

  const handleChangeProductSelectCrossSells = (
    productName: string,
    id: number
  ) => {
    const newProductListCrossSells = productListCrossSells.filter(
      (item) => item.productName !== productName
    )

    setProductSelectCrossSells((pre) => [...pre, {id, productName}])

    setProductListCrossSells(newProductListCrossSells)
  }

  const renderProductListUpsells = () =>
    productListUpsells.length === 0 ? (
      <p className='m-0 text-center py-3'>No products found</p>
    ) : (
      productListUpsells.map((product) => (
        <p
          className='m-0 select__item fw-medium cursor-pointer'
          key={product.id}
          onClick={() =>
            handleChangeProductSelectUpsells(product.productName, product.id)
          }>
          {product.productName}
        </p>
      ))
    )

  const renderProductListCrossSells = () =>
    productListCrossSells.length === 0 ? (
      <p className='m-0 text-center py-3'>No products found</p>
    ) : (
      productListCrossSells.map((product) => (
        <p
          className='m-0 select__item fw-medium cursor-pointer'
          key={product.id}
          onClick={() =>
            handleChangeProductSelectCrossSells(product.productName, product.id)
          }>
          {product.productName}
        </p>
      ))
    )

  const handleRemoveProductSelectUpsells = (
    productName: string,
    id: number
  ) => {
    const newProductSelectUpsells = productSelectUpsells.filter(
      (item) => item.productName !== productName
    )
    const newProductListUpsells = [
      ...productListUpsells,
      {id: id, productName: productName},
    ]

    setProductSelectUpsells(newProductSelectUpsells)
    setProductListUpsells(newProductListUpsells)
  }

  const handleRemoveProductSelectCrossSells = (
    productName: string,
    id: number
  ) => {
    const newProductSelectCrossSells = productSelectCrossSells.filter(
      (item) => item.productName !== productName
    )
    const newProductListCrossSells = [
      ...productListCrossSells,
      {id: id, productName: productName},
    ]

    setProductSelectCrossSells(newProductSelectCrossSells)
    setProductListCrossSells(newProductListCrossSells)
  }

  const handleRemoveAllProductUpsellsSelected = () => {
    setProductListUpsells((pre) => [...pre, ...productSelectUpsells])
    setProductSelectUpsells([])
  }

  const handleRemoveAllProductCrossSellsSelected = () => {
    setProductListCrossSells((pre) => [...pre, ...productSelectCrossSells])
    setProductSelectCrossSells([])
  }

  const renderProductSelectUpsells = () =>
    productSelectUpsells.map((item) => (
      <div
        className='product__selected d-flex align-items-center'
        key={item.id}>
        <span className='fw-medium text-black'>{item.productName}</span>
        <img
          src={closeCircleIcon}
          alt='close'
          onClick={() =>
            handleRemoveProductSelectUpsells(item.productName, item.id)
          }
        />
      </div>
    ))

  const renderProductSelectCrossSells = () =>
    productSelectCrossSells.map((item) => (
      <div
        className='product__selected d-flex align-items-center'
        key={item.id}>
        <span className='fw-medium text-black'>{item.productName}</span>
        <img
          src={closeCircleIcon}
          alt='close'
          onClick={() =>
            handleRemoveProductSelectCrossSells(item.productName, item.id)
          }
        />
      </div>
    ))

  return (
    <div className='linked-products d-flex flex-column align-items-end'>
      <div className='up-sells'>
        <div className='product-type__select-custom d-flex align-items-center'>
          <h3 className='linked-products__name m-0 fw-medium'>Upsells</h3>
          <img
            src={closeIcon}
            alt='close'
            className={`close-img cursor-pointer ${
              productSelectUpsells.length <= 0 ? 'no-data' : ''
            }`}
            onClick={handleRemoveAllProductUpsellsSelected}
          />

          <div className='separator mx-3'></div>

          <div
            className='select cursor-pointer d-flex flex-wrap align-items-center h-100'
            onClick={handleShowProductListUpsells}>
            {productSelectUpsells.length <= 0 ? (
              <span className='user-select-none'>Select product</span>
            ) : (
              renderProductSelectUpsells()
            )}
          </div>

          <div ref={selectListUpsellsRef}>
            {showProductListUpsells && (
              <div className='select__list'>
                {loadingUpsells ? (
                  <p className='m-0 text-center py-3'>Loading data...</p>
                ) : (
                  renderProductListUpsells()
                )}
              </div>
            )}
          </div>
        </div>
        <div className='linked-products__desc fw-medium mt-2'>
          Upsells are products which you recommend instead of the currently
          viewed product, for example, products that are more profitable or
          better quality or more expensive.
        </div>
      </div>

      <div className='cross-sells'>
        <div className='product-type__select-custom d-flex align-items-center'>
          <h3 className='linked-products__name m-0 fw-medium'>Cross-sells</h3>
          <img
            src={closeIcon}
            alt='close'
            className={`close-img cursor-pointer ${
              productSelectCrossSells.length <= 0 ? 'no-data' : ''
            }`}
            onClick={handleRemoveAllProductCrossSellsSelected}
          />

          <div className='separator mx-3'></div>

          <div
            className='select cursor-pointer d-flex flex-wrap align-items-center h-100'
            onClick={handleShowProductListCrossSells}>
            {productSelectCrossSells.length <= 0 ? (
              <span className='user-select-none'>Select product</span>
            ) : (
              renderProductSelectCrossSells()
            )}
          </div>

          <div ref={selectListCrossSellsRef}>
            {showProductListCrossSells && (
              <div className='select__list'>
                {loadingCrossSells ? (
                  <p className='m-0 text-center py-3'>Loading data...</p>
                ) : (
                  renderProductListCrossSells()
                )}
              </div>
            )}
          </div>
        </div>
        <div className='linked-products__desc fw-medium mt-2'>
          Cross-sells are products which you promote in the cart, based on the
          current product.
        </div>
      </div>
    </div>
  )
}
export default LinkedProducts
