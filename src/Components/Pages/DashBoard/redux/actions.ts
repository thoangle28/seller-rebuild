import generalApis from 'APIs/General.api'
import { iGeneral } from 'app/Models';
import { actionTypes } from './types';

const newCustomerByProductSuccess = (payload: any) => ({
    type: actionTypes.NEW_CUSTOMER_BY_PRODUCT_SUCCESS,
    payload
})

const totalOrderSuccess = (payload: any) => ({
    type: actionTypes.TOTAL_ORDER_SUCCESS,
    payload
})

const totalProductSaleSuccess = (payload: any) => ({
    type: actionTypes.TOTAL_PRODUCT_SALE_SUCCESS,
    payload
})

const totalTicketsSuccess = (payload: any) => ({
    type: actionTypes.TOTAL_TICKETS_SUCCESS,
    payload
})

const getData12Months = (payload: any) => ({
    type: actionTypes.TOTAL_SALE_12_MONTH_SUCCESS,
    payload
})

const isRequest = () => ({
    type: actionTypes.IS_REQUEST
})
const isFailure = (payload: string) => ({
    type: actionTypes.IS_FAILURE,
    payload
})
const isSuccess = () => ({
    type: actionTypes.IS_SUCCESS
})
const mapTotals = [newCustomerByProductSuccess, totalOrderSuccess, totalProductSaleSuccess, totalTicketsSuccess]

export const getTotalData = (formData: iGeneral) => async (dispatch: any) => {
    dispatch(isRequest())
    const { newCustomerByProduct, totalOrder, totalProductSale, totalTickets } = generalApis

    Promise.all([newCustomerByProduct(formData), totalOrder(formData), totalProductSale(formData), totalTickets(formData)])
        .then(function (res) {
            res.map((item, i: number) => {
                const { data } = item.data
                dispatch(isSuccess())

                return dispatch(mapTotals[i](data))
            })
        }).catch(err => dispatch(isFailure(err)))
}

export const getChartData = (formData: iGeneral) => async (dispatch: any) => {
    dispatch(isRequest())
    try {
        const response = await generalApis.totalProduct12Months(formData);
        const { data, code, message } = response.data
        if (code === 200) {
            dispatch(isSuccess())
            dispatch(getData12Months(data))
        } else {
            dispatch(isFailure(message))
        }
    } catch (error) {
        dispatch(isFailure(error.message))
    }
}
