
export const CURRENT_YEAR: string = new Date().getFullYear().toString()

export const MONTH_COLORS: string[] = [
    "#000080",
    "#0033CC",
    "#394772",
    "#004D1A",
    "#009933",
    "#AF4700",
    "#E17328",
    "#D33B0B",
    "#A71A1A",
    "#7D961A",
    "#7D961A",
    "#A2836E",
]

export const monthSerializable: any = {
    '1': "Jan",
    '2': "Feb",
    '3': "Mar",
    '4': "Apr",
    '5': "May",
    '6': "Jun",
    '7': "July",
    '8': "Aug",
    '9': "Sep",
    '10': "Oct",
    '11': "Nov",
    '12': "Dec"
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();
export const CURRENT_MONTH = months[d.getMonth()];