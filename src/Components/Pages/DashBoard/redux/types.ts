const totalOrder = {
    TOTAL_ORDER_SUCCESS: 'TOTAL_ORDER_SUCCESS',
}
const totalProductSale = {
    TOTAL_PRODUCT_SALE_SUCCESS: "TOTAL_PRODUCT_SALE_SUCCESS",
}
const totalTickets = {
    TOTAL_TICKETS_SUCCESS: "TOTAL_TICKETS_SUCCESS",
}
const newCustomerByProduct = {
    NEW_CUSTOMER_BY_PRODUCT_SUCCESS: 'NEW_CUSTOMER_BY_PRODUCT_SUCCESS',
}
const totalSale12Months = {
    TOTAL_SALE_12_MONTH_SUCCESS: 'TOTAL_SALE_12_MONTH_SUCCESS', 
}

export const actionTypes = {
    IS_REQUEST: "IS_REQUEST",
    IS_FAILURE: "IS_FAILURE",
    IS_SUCCESS: "IS_SUCCESS",
    ...totalOrder,
    ...totalProductSale,
    ...totalTickets,
    ...newCustomerByProduct,
    ...totalSale12Months
}