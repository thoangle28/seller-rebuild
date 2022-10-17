import { iMonthData } from "app/Models"

export const CURRENT_YEAR: string = new Date().getFullYear().toString()

export const MONTHS:iMonthData[] = [
    {name:"jan" , fullName:"January" , color:"#000080"},
    {name:"feb" , fullName:"February" , color:"#B7D7E8"},
    {name:"mar" , fullName:"March" , color:"#B7D7E8"},
    {name:"apr" , fullName:"April" , color:"#D7E7E4"},
    {name:"may" , fullName:"May" , color:"#CFE0E8"},
    {name:"jun" , fullName:"June" , color:"#BCCAD6"},
    {name:"jul" , fullName:"July" , color:"#8D9DB6"},
    {name:"aug" , fullName:"August" , color:"#667292"},
    {name:"sep" , fullName:"September" , color:"#F1E3DD"},
    {name:"oct" , fullName:"October" , color:"#FFF2DF"},
    {name:"nov" , fullName:"November" , color:"#D9AD7C"},
    {name:"dec" , fullName:"December" , color:"#A2836E"},
]