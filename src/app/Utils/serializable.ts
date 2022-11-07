import { iCurrency } from "app/Models";

export const currencyFormat = (amount: string | number) => {
    const localization: string = process.env.REACT_APP_LOCATION || '';
    const regex = /(\d)(?=(\d{3})+(?!\d))/g
    const currencySymbols: iCurrency = {
        "VN": "₫",
        "TH": "฿",
        "PH": "₱",
        "ID": "Rp",
        "MALAY": "RM",
        "SG": "$",
        "TW": "NT$",
        "HK": "HK$", 
    }
 
    if (!amount)
        return `${amount}${currencySymbols[localization]}`
    if (['HK', 'VN'].includes(localization))
        return `${amount.toString().replace(regex, '$1,') || ''}${currencySymbols[localization]}`

    return `${currencySymbols[localization]}${amount.toString().replace(regex, '$1,') || ''}`
};
