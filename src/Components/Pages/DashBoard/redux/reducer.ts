import { actionTypes } from "./types";

const requestSuccess = {
    isSuccess: true,
    isFailure: false,
    isLoading: false,
}

const requestFailure = {
    isSuccess: false,
    isFailure: true,
    isLoading: false,
}

const requestLoading = {
    isSuccess: false,
    isFailure: false,
    isLoading: true,
}

const initialState = {
    isSuccess: false,
    isFailure: false,
    isLoading: false,
    totalOrder: '',
    newCustomerByProduct: '',
    totalProductSale: '',
    totalTicKets: '',
    data12Months: {
        list: [],
        time: ''
    },
    message: ''
}

export const generalReducer = (state: any = initialState, action: any) => {
    const { type, payload } = action
    switch (type) {
        case actionTypes.IS_FAILURE:
            return { ...state, ...requestFailure, message: payload }
        case actionTypes.IS_REQUEST:
            return { ...state, ...requestLoading }
        case actionTypes.IS_SUCCESS:
            return { ...state, ...requestSuccess }
        case actionTypes.NEW_CUSTOMER_BY_PRODUCT_SUCCESS:
            return { ...state, newCustomerByProduct: payload }
        case actionTypes.TOTAL_ORDER_SUCCESS:
            return { ...state, totalOrder: payload }
        case actionTypes.TOTAL_PRODUCT_SALE_SUCCESS:
            return { ...state, totalProductSale: payload }
        case actionTypes.TOTAL_TICKETS_SUCCESS:
            return { ...state, totalTicKets: payload }

        case actionTypes.TOTAL_SALE_12_MONTH_SUCCESS:
            return { ...state, data12Months: payload }
        default:
            return state
    }
}