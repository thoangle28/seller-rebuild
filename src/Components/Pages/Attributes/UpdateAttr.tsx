import { useFormik } from 'formik'
import { FC } from 'react'
import { useAppDispatch, useAppSelector } from 'app/Hooks/hooks'
import { updateAttribute, updateChildAttr } from './Redux/actions'
import { iUpdateAttr, iUpdateChildAttribute } from 'app/Models'
interface updateForm {
    isChildUpdate: boolean,
    oldAttribute: string,
    getAllDataPayload: any
}

const UpdateAttr: FC<updateForm> = (props: updateForm) => {
    const { isChildUpdate, oldAttribute, getAllDataPayload } = props
    const dispatch = useAppDispatch();
    const updateAttrForm = {
        new_attribute_name: '',
    }

    const { attributeList } = useAppSelector(state => state.attributesReducer)

    const updateChildAttrForm = {
        id_term: '',
        parent_id: '',
        new_attribute_term_name: '',
        access_token: ''
    }

    const updateAttr = useFormik({
        initialValues: updateAttrForm,
        onSubmit: values => {
            const updateAttrPayload: iUpdateAttr = {
                old_attribute_name: oldAttribute,
                new_attribute_name: values.new_attribute_name,
                access_token: getAllDataPayload.access_token,
            }
            dispatch(updateAttribute(updateAttrPayload, updateAttr.resetForm()))
        },
    });

    const updateChildAttribute = useFormik({
        initialValues: updateChildAttrForm,
        onSubmit: values => {
            // const updateAttrPayload: iUpdateChildAttribute = {
            //     id_term: '',
            //     access_token,
            //     parent_id: '123',
            //     new_attribute_term_name: values.new_attribute_term_name
            // }
            // dispatch(updateChildAttr(updateAttrPayload, updateChildAttribute.resetForm())
        },
    })

    const renderListOptions = attributeList.map((item: any) => {
        return (
            <option value={item.id} key={item.id}>
                {item.label}
            </option>
        )
    })

    const renderUpdateAttrForm = () => {
        return <div className='attributes__create'>
            <div className='attributes__title text-uppercase pb-3'>
                UPDATE ATTRIBUTE
            </div>

            <div className='attributes__content p-4'>
                <div className='attributes__content-top pb-3'>
                    <div className='attributes__content-title text-capitalize pb-2'>
                        Update Parent Attribute
                    </div>

                </div>

                <div className='attributes__content-bot'>
                    <div className='attributes__content-title text-capitalize pb-2'>
                        New Attribute Name
                    </div>
                    <form onSubmit={updateAttr.handleSubmit}>
                        <input type="text" name="new_attribute_name" onChange={updateAttr.handleChange} id="" />
                        <div className='mt-3'>
                            <button className='btn btn-primary'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    }

    const renderUpdateChildAttrForm = () => {
        return <div className='attributes__create'>
            <div className='attributes__title text-uppercase pb-3'>
                UPDATE CHILD ATTRIBUTE
            </div>

            <div className='attributes__content p-4'>
                <div className='attributes__content-top pb-3'>
                    <div className='attributes__content-title text-capitalize pb-2'>
                        Old Attribute Name
                    </div>
                    <input type="text" />
                </div>

                <div className='attributes__content-bot'>
                    <div className='attributes__content-title text-capitalize pb-2'>
                        Child Attribute Name
                    </div>

                    <form>



                        <div className='mt-3'>
                            <button className='btn btn-primary'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    }

    return <>
        {!isChildUpdate ? renderUpdateAttrForm() : renderUpdateChildAttrForm()}
    </>

}

export default UpdateAttr