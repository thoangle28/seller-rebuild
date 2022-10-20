import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from 'app/Hooks/hooks'
import ButtonPrimary from 'Components/Common/ButtonPrimary'
import DefaultLayout from 'Components/Layouts/DefaultLayout'
import { useFormik } from 'formik'
import { Fragment, useEffect, useState } from 'react'
import {
  createNewAttribute,
  createNewChildrenAttribute,
  getAttributeList,
} from './Redux/actions'
import createNewAttributeSchema from './Schema'
import './style.scss'

const Attributes = () => {
  const [isActiveIndex, setActiveIndex] = useState<number>()
  const [selectParentAttribute, setSelectParentAttribute] = useState<
    string | number
  >('')

  const dispatch = useAppDispatch()
  const { isLoading, attributeList } = useAppSelector(
    (state) => state.attributesReducer
  )

  // Get user_id and access_token from localStorage
  const profile = JSON.parse(localStorage.getItem('profile') || '{}')
  const { ID } = profile.user
  const { access_token } = profile
  const getAllDataPayload = {
    user_id: ID, access_token
  }
  // Get all attributes
  useEffect(() => {

    dispatch(getAttributeList(getAllDataPayload))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeInput = (e: any) => {
    handleChange(e)
    setFieldTouched('newAttribute', false, false)
  }

  const handleChangeValueSelect = (e: any) => {
    setSelectParentAttribute(e.target.value)
  }

  // Handle submit form create new attribute
  const handleAddNewAttribute = (values: any, actions: any) => {
    const { newAttribute } = values
    const payload = {
      user_id: ID,
      access_token: access_token,
      label_name: newAttribute,
    }

    if (!selectParentAttribute) {
      dispatch(createNewAttribute(payload, actions, getAllDataPayload))
    } else {
      handleAddNewChildrenAttribute(newAttribute, actions)
    }
  }

  // Handle submit form create new children attribute
  const handleAddNewChildrenAttribute = (
    newAttribute: string,
    actions: any
  ) => {
    const payload = {
      parent_id: selectParentAttribute,
      access_token: access_token,
      term_name: newAttribute,
    } 
    dispatch(createNewChildrenAttribute(payload, actions, getAllDataPayload))
  }

  const toggleAttr = (index: number) => {
    setActiveIndex(isActiveIndex === index ? undefined : index)
  }

  const {
    values,
    errors,
    touched,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting, 
  } = useFormik({
    initialValues: {
      newAttribute: '',
    },
    validationSchema: createNewAttributeSchema,
    onSubmit: handleAddNewAttribute,
  })
 
  // Render list attributes
  const listAttributes = attributeList.map((item: any, index: number) => {
    const checkOpen = isActiveIndex === index

    return (
      <Fragment key={item.id}>
        <div className='attributes__content-item d-flex align-items-center justify-content-between mb-2'>
          <div
            className='attributes__content-item-left d-flex align-items-center'
            onClick={() => toggleAttr(index)}>
            <h3 className='m-0'>{item.label}</h3>
            <ButtonPrimary className='attributes__children-options ms-3'>
              {item.options?.length || 0}
            </ButtonPrimary>
          </div>
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>

        {checkOpen && item.options.length > 0 && (
          <div className='attributes__children-list mb-4' key={item.id}>
            {item.options.map((item: any) => (
              <div
                className='attributes__children-item d-flex align-items-center justify-content-between py-2'
                key={item.id}>
                <h3 className='m-0'>{item.label}</h3>
                <FontAwesomeIcon icon={faPenToSquare} />
              </div>
            ))}
          </div>
        )}
      </Fragment>
    )
  })

  // Render list options
  const renderListOptions = attributeList.map((item: any) => {
    return (
      <option value={item.id} key={item.id}>
        {item.label}
      </option>
    )
  })

  // Render content add new attribute
  const renderContentAddNewAttribute = () => {
    return (
      <div className='attributes__create'>
        <div className='attributes__title text-uppercase pb-3'>
          ADD NEW ATTRIBUTE
        </div>

        <div className='attributes__content p-4'>
          <div className='attributes__content-top pb-3'>
            <div className='attributes__content-title text-capitalize pb-2'>
              Parent Attribute
            </div>
            <select
              className=' w-100 attributes__content-select'
              id='parent-attributes'
              value={selectParentAttribute}
              onChange={handleChangeValueSelect}>
              <option value=''>None</option>
              {renderListOptions}
            </select>
          </div>

          <div className='attributes__content-bot'>
            <div className='attributes__content-title text-capitalize pb-2'>
              Child Attribute Name
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type='text'
                className={
                  errors.newAttribute && touched.newAttribute
                    ? 'attributes__content-input attributes__content-input--error w-100'
                    : 'attributes__content-input w-100'
                }
                name='newAttribute'
                value={values.newAttribute}
                onChange={handleChangeInput}
                onBlur={handleBlur}
              />

              {errors.newAttribute && touched.newAttribute && (
                <p className='attributes__content-text-error m-0 pt-2'>
                  {errors.newAttribute}
                </p>
              )}

              <div className='mt-3'>
                <ButtonPrimary
                  className='attributes__content-btn'
                  type='submit'
                  disabled={isSubmitting}>
                  Add New
                </ButtonPrimary>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Render content attribute list
  const renderContentAttributeList = () => {
    return (
      <>
        <div className='attributes__title text-uppercase pb-3'>
          ATTRIBUTES LISTING
        </div>

        <div className='attributes__content p-4'>
          {isLoading ? (
            <h5>Loading ...</h5>
          ) : (
            <div className='attributes__content-list pe-4'>
              {listAttributes}
            </div>
          )}
        </div>
      </>
    )
  }

  return (
    <DefaultLayout>
      <div className='attributes'>
        <div className='row'>
          <div className='col-sm-12 col-md-6 col-lg-6'>
            {renderContentAddNewAttribute()}
          </div>

          <div className='col-sm-12 col-md-6 col-lg-6'>
            {renderContentAttributeList()}
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Attributes
