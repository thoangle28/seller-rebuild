import { iGeneral } from 'app/Models'
import axiosConfig from './AxiosConfig'

const generalApis = {
    totalOrder: (payload: iGeneral) => {
        return axiosConfig.post('/sale-report/total-order', payload)
    },
    totalProductSale: (payload: iGeneral) => {
        return axiosConfig.post('/sale-report/total-product-sale', payload)
    },
    totalTickets: (payload: iGeneral) => {
        return axiosConfig.post('/sale-report/total-ticket', payload)
    },
    newCustomerByProduct: (payload: iGeneral) => {
        return axiosConfig.post('/sale-report/new-customer-by-product', payload)
    }
    , totalProduct12Months: (payload: iGeneral) => {
        return axiosConfig.post('/sale-report/total-product-sales-twelve-months', payload)
    }
}

export default generalApis