import { iMonthData } from "app/Models"

export const CURRENT_YEAR: string = new Date().getFullYear().toString()

export const MONTHS: iMonthData[] = [
    { name: "jan", fullName: "January", color: "#000080" },
    { name: "feb", fullName: "February", color: "#0033CC" },
    { name: "mar", fullName: "March", color: "#394772" },
    { name: "apr", fullName: "April", color: "#004D1A" },
    { name: "may", fullName: "May", color: "#009933" },
    { name: "jun", fullName: "June", color: "#AF4700" },
    { name: "jul", fullName: "July", color: "#E17328" },
    { name: "aug", fullName: "August", color: "#D33B0B" },
    { name: "sep", fullName: "September", color: "#A71A1A" },
    { name: "oct", fullName: "October", color: "#7D961A" },
    { name: "nov", fullName: "November", color: "#7D961A" },
    { name: "dec", fullName: "December", color: "#A2836E" },
]

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();
export const CURRENT_MONTH = months[d.getMonth()];