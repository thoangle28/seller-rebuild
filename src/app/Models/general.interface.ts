export interface iGeneral {
    user_id: string
}

export interface iProductListing {
    user_id: string | number
    page_size: number,
    current_page: number,
    search: string,
    status: string,
}