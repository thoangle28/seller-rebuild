import { useAppDispatch, useAppSelector } from 'app/Hooks/hooks'
import ButtonPrimary from 'Components/Common/ButtonPrimary'
import Loading from 'Components/Common/Loading'
import DefaultLayout from 'Components/Layouts/DefaultLayout'
import iconError from './../../../app/Images/icons/icon-error.svg'
import iconSuccess from './../../../app/Images/icons/icon-success.svg'
import { useFormik } from 'formik'
import { Fragment, useEffect, useState } from 'react'
import {
  createNewAttribute,
  createNewChildrenAttribute,
  getAttributeList,
  changeUpdateMode,
  deleteMessage,
} from './Redux/actions'
import createNewAttributeSchema from './Schema'
import './style.scss'
import UpdateAttr from './UpdateAttr'
import editIcon from './../../../app/Images/icons/edit-icon.svg'

const Attributes = () => {
  const [isActiveIndex, setActiveIndex] = useState<number>()
  const [selectParentAttribute, setSelectParentAttribute] = useState<
    string | number
  >('')

  const [isChildUpdate, setIsChildUpdate] = useState<boolean>(false)
  const [oldAttrName, setOldAttrName] = useState<string>('')
  const [oldChildrenAttrName, setOldChildrenAttrName] = useState<string>('')
  const [idTerm, setIdTerm] = useState<number>(0)
  const [parentId, setParentId] = useState<number | string>('')

  const dispatch = useAppDispatch()
  const { isLoading, message, attributeList, isUpdate, isFailure, isSuccess } =
    useAppSelector((state) => state.attributesReducer)

  // Get user_id and access_token from localStorage
  const { user, accessToken: access_token } = useAppSelector(
    (state) => state.loginReducer
  )
  const { ID } = user

  const getAllDataPayload = {
    user_id: ID,
    access_token,
  }

  // Get all attributes
  useEffect(() => {
    dispatch(getAttributeList(getAllDataPayload))

    return () => {
      dispatch(deleteMessage())
      dispatch(changeUpdateMode(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeInput = (e: any) => {
    handleChange(e)
    setSubmitting(false)
    setFieldTouched('newAttribute', false, false)
  }

  const handleChangeValueSelect = (e: any) => {
    setSelectParentAttribute(e.target.value)
  }

  // Handle submit form create new attribute
  const handleAddNewAttribute = (values: any) => {
    const { newAttribute } = values
    const payload = {
      user_id: ID,
      access_token: access_token,
      label_name: newAttribute,
    }

    if (!selectParentAttribute) {
      dispatch(createNewAttribute(payload, getAllDataPayload))
    } else {
      handleAddNewChildrenAttribute(newAttribute)
    }
  }

  // Handle submit form create new children attribute
  const handleAddNewChildrenAttribute = (newAttribute: string) => {
    const payload = {
      parent_id: selectParentAttribute,
      access_token: access_token,
      term_name: newAttribute,
    }
    dispatch(createNewChildrenAttribute(payload, getAllDataPayload))
  }

  const handleShowEditForm = (oldAttrName: string) => {
    dispatch(changeUpdateMode(true))
    setIsChildUpdate(false)
    setOldAttrName(oldAttrName)
  }

  const handleShowEditFormChildren = (
    id: number,
    parentId: number,
    childrenAttrLabel: string
  ) => {
    dispatch(changeUpdateMode(true))
    setParentId(parentId)
    setOldChildrenAttrName(childrenAttrLabel)
    setIsChildUpdate(true)
    setIdTerm(id)
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
    setSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      newAttribute: '',
    },
    validationSchema: createNewAttributeSchema,
    onSubmit: handleAddNewAttribute,
  })

  if (isSuccess && message) {
    setTimeout(() => {
      setSelectParentAttribute('')
      setFieldValue('newAttribute', '', false)
      setSubmitting(false)
      dispatch(deleteMessage())
    }, 3150)
  }

  // Render list attributes
  const listAttributes =
    attributeList.length <= 0 && isFailure ? (
      <div className='mess-get-error d-flex flex-column align-items-center p-4'>
        <img src={iconError} alt='icon error' />
        <h3 className='m-0 mt-3 text-danger'>
          Internal Server Error. Please report to admin
        </h3>
      </div>
    ) : attributeList.length <= 0 && isSuccess ? (
      <p className='attributes__no-current text-primary text-center m-0'>
        Your attribute is currently empty
      </p>
    ) : (
      attributeList.map((parent: any, index: number) => {
        const checkOpen = isActiveIndex === index

        return (
          <Fragment key={parent.id}>
            <div className='attributes__content-item d-flex align-items-center justify-content-between mb-2'>
              <div
                className='attributes__content-item-left d-flex align-items-center'
                onClick={() => {
                  toggleAttr(index)
                }}>
                <h3 className='m-0'>{parent.label}</h3>
                <ButtonPrimary className='attributes__children-options ms-3'>
                  {parent.options?.length || 0}
                </ButtonPrimary>
              </div>
              <div onClick={() => handleShowEditForm(parent.label)}>
                <img src={editIcon} alt='edit' className='cursor-pointer' />
              </div>
            </div>

            {checkOpen && parent.options.length > 0 && (
              <div className='attributes__children-list mb-4' key={parent.id}>
                {parent.options.map((item: any) => (
                  <div
                    className='attributes__children-item d-flex align-items-center justify-content-between py-2 cursor-pointer'
                    key={item.id}>
                    <h3 className='m-0 '>{item.label} </h3>
                    <div
                      onClick={() =>
                        handleShowEditFormChildren(
                          item.id,
                          parent.id,
                          item.label
                        )
                      }>
                      <img
                        src={editIcon}
                        alt='edit'
                        className='cursor-pointer'
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Fragment>
        )
      })
    )

  // Render list options (Parent section)
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
      <>
        <div className='attributes__title text-uppercase pb-3'>
          ADD NEW ATTRIBUTE
        </div>

        <div className='attributes__content p-4'>
          {isLoading ? (
            <Loading />
          ) : (
            <div className='attributes__content-top pb-3'>
              {isFailure && message && (
                <div
                  className='mess-box d-flex flex-column py-2 align-items-center mb-3'
                  style={{ backgroundColor: 'rgba(197, 34, 31, 0.2)' }}>
                  <img src={iconError} alt='icon error' />
                  <h3 className='m-0 mt-2 text-danger'>{message}</h3>
                </div>
              )}

              {isSuccess && message && (
                <div
                  className='mess-box d-flex flex-column py-2 align-items-center mb-3'
                  style={{ backgroundColor: 'rgba(52, 168, 83, 0.2)' }}>
                  <img src={iconSuccess} alt='icon success' />
                  <h3 className='m-0 mt-2 text-success'>{message}</h3>
                </div>
              )}

              <div className='attributes__create mb-3'>
                <label
                  htmlFor='parent-attributes'
                  className='attributes__content-title text-capitalize pb-2 fw-medium'>
                  Parent Attribute
                </label>
                <select
                  className='w-100 attributes__content-select'
                  id='parent-attributes'
                  value={selectParentAttribute}
                  onChange={handleChangeValueSelect}>
                  <option value=''>None</option>
                  {renderListOptions}
                </select>
              </div>

              <div className='attributes__content-bot'>
                <label
                  htmlFor='add-attribute'
                  className='attributes__content-title text-capitalize pb-2 fw-medium'>
                  Child Attribute Name
                </label>

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
                    id='add-attribute'
                  />

                  {errors.newAttribute && touched.newAttribute && (
                    <p className='attributes__content-text-error m-0 pt-2 fw-medium'>
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
          )}
        </div>
      </>
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
            <Loading />
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
            {isUpdate ? (
              <UpdateAttr
                isChildUpdate={isChildUpdate}
                getAllDataPayload={getAllDataPayload}
                oldAttribute={oldAttrName}
                idTerm={idTerm}
                parentId={parentId}
                childLabel={oldChildrenAttrName}
              />
            ) : (
              renderContentAddNewAttribute()
            )}
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
