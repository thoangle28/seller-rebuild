import {useState, useRef, useEffect} from 'react'
import {useOnClickOutside} from 'app/Hooks/UseClickOutSide'
import closeIcon from './../../../../app/Images/icons/close-no-border.svg'
import arrowIcon from './../../../../app/Images/arrow-down.png'
import addIcon from './../../../../app/Images/icons/add.svg'
import closeCircleIcon from './../../../../app/Images/icons/close-circle.svg'
import useDebounce from 'app/Hooks/UseDebounce'

const LinkedProducts = () => {
  const [showUpsells, setShowUpsells] = useState<boolean>(false)
  const [upsellsList, setUpsellsList] = useState<any[]>([])
  const [upsellsListSearch, setUpsellsListSearch] = useState<any[]>([])
  const [upsellsListSelected, setUpsellsListSelected] = useState<any[]>([])
  const [filterUpsells, setFilterUpsells] = useState<string>('')
  const [loadingUpsells, setLoadingUpsells] = useState<boolean>(false)

  const [showCrossSells, setShowCrossSells] = useState<boolean>(false)
  const [crossSellsList, setCrossSellsList] = useState<any[]>([])
  const [crossSellsListSearch, setCrossSellsListSearch] = useState<any[]>([])
  const [crossSellsListSelected, setCrossSellsListSelected] = useState<any[]>(
    []
  )
  const [filterCrossSells, setFilterCrossSells] = useState<string>('')
  const [loadingCrossSells, setLoadingCrossSells] = useState<boolean>(false)

  const upsellsRef = useRef<HTMLDivElement>(null)
  const inputUpsellsRef = useRef<HTMLInputElement>(null)
  const crossSellsRef = useRef<HTMLDivElement>(null)
  const inputCrossSellsRef = useRef<HTMLInputElement>(null)

  const valueUpsellsDebounce = useDebounce(filterUpsells, 800)
  const valueCrossSellsDebounce = useDebounce(filterCrossSells, 800)

  useOnClickOutside(upsellsRef, () => setShowUpsells(false))
  useOnClickOutside(crossSellsRef, () => setShowCrossSells(false))

  useEffect(() => {
    setUpsellsList(dataUpsells)
    setCrossSellsList(dataCrossSells)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const newUpsellsListSearch = upsellsList.filter((upsells) =>
      upsells.name.toLocaleLowerCase().trim().includes(filterUpsells)
    )
    setUpsellsListSearch(newUpsellsListSearch)

    setLoadingUpsells(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueUpsellsDebounce])
  useEffect(() => {
    const newCrossSellsListSearch = upsellsList.filter((crossSells) =>
      crossSells.name.toLocaleLowerCase().trim().includes(filterCrossSells)
    )
    setCrossSellsListSearch(newCrossSellsListSearch)

    setLoadingCrossSells(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueCrossSellsDebounce])

  const dataUpsells = [
    {
      id: 1,
      name: 'test',
    },
    {
      id: 2,
      name: 'test1 test',
    },
    {
      id: 3,
      name: 'test test1 test',
    },
    {
      id: 4,
      name: 'test1',
    },
    {
      id: 5,
      name: 'tes1t test1',
    },
    {
      id: 6,
      name: 'test te2st test1',
    },
    {
      id: 7,
      name: 'test test test1',
    },
  ]

  const dataCrossSells = [
    {
      id: 1,
      name: '2  te1st',
    },
    {
      id: 2,
      name: '2 test1 test',
    },
    {
      id: 3,
      name: '2 test test1 test',
    },
    {
      id: 4,
      name: '2 test1',
    },
    {
      id: 5,
      name: '2 tes1t test1',
    },
    {
      id: 6,
      name: '2 test te2st test1',
    },
    {
      id: 7,
      name: '2 test test test1',
    },
  ]

  // ================== Upsells ===========================

  const handleFilterUpsells = (e: any) => {
    setFilterUpsells(e.target.value)
    setShowUpsells(true)
    setLoadingUpsells(true)
  }

  const handleRemoveUpsellsSelected = (upsells: any) => {
    const findId = upsellsList.findIndex((item) => item.id > upsells.id)

    findId === -1
      ? setUpsellsList((pre) => [...pre, {...upsells}])
      : upsellsList.splice(findId, 0, upsells)

    const newUpsellsListUserSelected = upsellsListSelected.filter(
      (item) => item.id !== upsells.id
    )
    setUpsellsListSelected(newUpsellsListUserSelected)
  }

  const handleRemoveAllUpsellsSelected = () => {
    setFilterUpsells('')
    setUpsellsListSelected([])
    setUpsellsList(dataUpsells)
  }

  const handleSelectedUpsells = (upsells: any) => {
    const newUpsellsList = upsellsList.filter((item) => item.id !== upsells.id)
    const newUpsellsListSearch = upsellsListSearch.filter(
      (item) => item.id !== upsells.id
    )
    setUpsellsListSelected((pre) => [...pre, upsells])
    setUpsellsListSearch(newUpsellsListSearch)
    setUpsellsList(newUpsellsList)
    inputUpsellsRef.current?.focus()
  }

  const renderUpsellsList = () => {
    return upsellsList.length === 0 ? (
      <p className='m-0 ms-2 fw-medium py-2 text-center'>No Upsells Found</p>
    ) : (
      upsellsList.map((upsells) => (
        <div
          onClick={() => handleSelectedUpsells(upsells)}
          className='m-0 cursor-pointer py-2 ps-3 d-flex align-items-center bg-white'
          key={upsells.id}>
          <img src={addIcon} alt='add' />
          <p className='m-0 ms-2 fw-medium bg-white'>{upsells.name}</p>
        </div>
      ))
    )
  }

  const renderUpsellsListSearch = () => {
    return upsellsListSearch.length === 0 ? (
      <p className='m-0 ms-2 fw-medium py-2 text-center'>No Upsells Found</p>
    ) : (
      upsellsListSearch.map((upsells) => (
        <div
          onClick={() => handleSelectedUpsells(upsells)}
          className='m-0 cursor-pointer py-2 ps-3 d-flex align-items-center bg-white'
          key={upsells.id}>
          <img src={addIcon} alt='add' />
          <p className='m-0 ms-2 fw-medium bg-white'>{upsells.name}</p>
        </div>
      ))
    )
  }

  const renderUpsellsListSelected = () => {
    return upsellsListSelected.map((upsells) => (
      <div
        className='item__selected d-flex align-items-center'
        key={upsells.id}>
        <p className='fw-medium text-black m-0'>{upsells.name}</p>
        <img
          src={closeCircleIcon}
          alt='close'
          className='cursor-pointer'
          onClick={() => handleRemoveUpsellsSelected(upsells)}
        />
      </div>
    ))
  }

  // ====================== End Upsells ============================

  // ======================== Cross-sells ==========================

  const handleFilterCrossSells = (e: any) => {
    setFilterCrossSells(e.target.value)
    setShowCrossSells(true)
    setLoadingCrossSells(true)
  }

  const handleRemoveCrossSellsSelected = (crossSells: any) => {
    const findId = crossSellsList.findIndex((item) => item.id > crossSells.id)

    findId === -1
      ? setCrossSellsList((pre) => [...pre, {...crossSells}])
      : crossSellsList.splice(findId, 0, crossSells)

    const newCrossSellsListUserSelected = crossSellsListSelected.filter(
      (item) => item.id !== crossSells.id
    )
    setCrossSellsListSelected(newCrossSellsListUserSelected)
  }

  const handleRemoveAllCrossSellsSelected = () => {
    setFilterCrossSells('')
    setCrossSellsListSelected([])
    setCrossSellsList(dataCrossSells)
  }

  const handleSelectedCrossSells = (crossSells: any) => {
    const newCrossSellsList = crossSellsList.filter(
      (item) => item.id !== crossSells.id
    )
    const newCrossSellsListSearch = crossSellsListSearch.filter(
      (item) => item.id !== crossSells.id
    )
    setCrossSellsListSelected((pre) => [...pre, crossSells])
    setCrossSellsListSearch(newCrossSellsListSearch)
    setCrossSellsList(newCrossSellsList)
    inputCrossSellsRef.current?.focus()
  }

  const renderCrossSellsList = () => {
    return crossSellsList.length === 0 ? (
      <p className='m-0 ms-2 fw-medium py-2 text-center'>
        No Cross-sells Found
      </p>
    ) : (
      crossSellsList.map((crossSells) => (
        <div
          onClick={() => handleSelectedCrossSells(crossSells)}
          className='m-0 cursor-pointer py-2 ps-3 d-flex align-items-center bg-white'
          key={crossSells.id}>
          <img src={addIcon} alt='add' />
          <p className='m-0 ms-2 fw-medium bg-white'>{crossSells.name}</p>
        </div>
      ))
    )
  }

  const renderCrossSellsListSearch = () => {
    return crossSellsListSearch.length === 0 ? (
      <p className='m-0 ms-2 fw-medium py-2 text-center'>
        No Cross-sells Found
      </p>
    ) : (
      crossSellsListSearch.map((crossSells) => (
        <div
          onClick={() => handleSelectedCrossSells(crossSells)}
          className='m-0 cursor-pointer py-2 ps-3 d-flex align-items-center bg-white'
          key={crossSells.id}>
          <img src={addIcon} alt='add' />
          <p className='m-0 ms-2 fw-medium bg-white'>{crossSells.name}</p>
        </div>
      ))
    )
  }

  const renderCrossSellsListSelected = () => {
    return crossSellsListSelected.map((crossSells) => (
      <div
        className='item__selected d-flex align-items-center'
        key={crossSells.id}>
        <p className='fw-medium text-black m-0'>{crossSells.name}</p>
        <img
          src={closeCircleIcon}
          alt='close'
          className='cursor-pointer'
          onClick={() => handleRemoveCrossSellsSelected(crossSells)}
        />
      </div>
    ))
  }

  // ===================== End Cross Sells ==============================

  return (
    <div className='linked-products d-flex flex-column align-items-end'>
      <div className='up-sells'>
        <div className='d-flex'>
          <h3 className='linked-products__name m-0 fw-medium me-3'>Upsells</h3>

          <div className='select-custom-wrap d-flex align-items-center'>
            <img
              src={closeIcon}
              alt='close'
              className='close-img cursor-pointer'
              onClick={handleRemoveAllUpsellsSelected}
            />

            <div className='separator'></div>

            <div
              ref={upsellsRef}
              className='d-flex flex-grow-1 align-items-center'>
              <div className='select d-flex align-items-center flex-wrap ps-3'>
                <div
                  className={`d-flex flex-wrap w-100 selected__list ${
                    upsellsListSelected.length > 0 ? '' : 'm-0'
                  }`}>
                  {renderUpsellsListSelected()}
                  <input
                    type='text'
                    className={`flex-grow-1 ${
                      upsellsListSelected.length > 0 ? '' : 'no-item'
                    } `}
                    autoComplete='off'
                    value={filterUpsells}
                    onChange={handleFilterUpsells}
                    ref={inputUpsellsRef}
                    hidden={upsellsList.length <= 0}
                    onClick={() => {
                      setShowUpsells(!showUpsells)
                    }}
                  />
                </div>
              </div>

              {showUpsells && (
                <div className='select__children-list py-2'>
                  {filterUpsells ? (
                    loadingUpsells ? (
                      <p className='m-0 ms-2 fw-medium py-2 text-center'>
                        Loading data. Please wait...
                      </p>
                    ) : (
                      renderUpsellsListSearch()
                    )
                  ) : (
                    renderUpsellsList()
                  )}
                </div>
              )}

              <div
                onClick={() => setShowUpsells(!showUpsells)}
                className='arr-img h-100 d-flex align-items-center'>
                <img src={arrowIcon} alt='arrow' />
              </div>
            </div>
          </div>
        </div>
        <div className='linked-products__desc fw-medium mt-2 ms-auto'>
          Upsells are products which you recommend instead of the currently
          viewed product, for example, products that are more profitable or
          better quality or more expensive.
        </div>
      </div>
      <div className='cross-sells'>
        <div className='d-flex'>
          <h3 className='linked-products__name m-0 fw-medium me-3'>
            Cross-sells
          </h3>

          <div className='select-custom-wrap d-flex align-items-center'>
            <img
              src={closeIcon}
              alt='close'
              className='close-img cursor-pointer'
              onClick={handleRemoveAllCrossSellsSelected}
            />

            <div className='separator'></div>

            <div
              ref={crossSellsRef}
              className='d-flex flex-grow-1 align-items-center'>
              <div className='select d-flex align-items-center flex-wrap ps-3'>
                <div
                  className={`d-flex flex-wrap w-100 selected__list ${
                    crossSellsListSelected.length > 0 ? '' : 'm-0'
                  }`}>
                  {renderCrossSellsListSelected()}
                  <input
                    type='text'
                    className={`flex-grow-1 ${
                      crossSellsListSelected.length > 0 ? '' : 'no-item'
                    } `}
                    autoComplete='off'
                    value={filterCrossSells}
                    onChange={handleFilterCrossSells}
                    ref={inputCrossSellsRef}
                    hidden={crossSellsList.length <= 0}
                    onClick={() => {
                      setShowCrossSells(!showCrossSells)
                    }}
                  />
                </div>
              </div>

              {showCrossSells && (
                <div className='select__children-list py-2'>
                  {filterCrossSells ? (
                    loadingCrossSells ? (
                      <p className='m-0 ms-2 fw-medium py-2 text-center'>
                        Loading data. Please wait...
                      </p>
                    ) : (
                      renderCrossSellsListSearch()
                    )
                  ) : (
                    renderCrossSellsList()
                  )}
                </div>
              )}

              <div
                onClick={() => setShowCrossSells(!showCrossSells)}
                className='arr-img h-100 d-flex align-items-center'>
                <img src={arrowIcon} alt='arrow' />
              </div>
            </div>
          </div>
        </div>
        <div className='linked-products__desc fw-medium mt-2 ms-auto'>
          Cross-sells are products which you promote in the cart, based on the
          current product.
        </div>
      </div>
    </div>
  )
}
export default LinkedProducts
