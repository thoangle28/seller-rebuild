
export interface iResponse {
    code: String | number,
    message: string,
    data: any
}

export interface iInfoData {
    title: string,
    subtitle: string,
    icon: any,
    number: number
}

export interface iCurrency {
    [key: string]: string
}