import { iTableHead } from "app/Models";

export const TABLE_PRODUCT_LIST: iTableHead[] = [
    { name: 'Product Id', className: '' },
    { name: 'Product Name', className: '' },
    { name: 'Type', className: 'text-center' },
    { name: 'SKU', className: 'text-center' },
    { name: 'Price', className: 'text-center' },
    { name: 'Date', className: 'text-center' },
    { name: 'Status', className: '' },
    { name: 'Actions', className: 'text-center' },
]

export const TABLE_PRODUCT_SALE_STATUS = [
    { name: 'Processing', btnStatus: 'primary' },
    { name: 'Refunded', btnStatus: 'warning' },
    { name: 'In China Warehous ', btnStatus: 'info' },
    { name: 'Leave China Port', btnStatus: 'success' },
    { name: 'Reach Singapore Port', btnStatus: 'success' },
    { name: 'Reach Tuas Wareho', btnStatus: 'success' },
    { name: 'Failed', btnStatus: 'danger' },
    { name: 'on hold', btnStatus: 'danger' },
    { name: 'pending', btnStatus: 'warning' },
    { name: 'publish', btnStatus: 'success' },
    { name: 'completed', btnStatus: 'success' },
]