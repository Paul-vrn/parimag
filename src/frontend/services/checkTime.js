import {getPeriodes} from '../api/periode'
import { timeParse } from './timeParse';

export async function checkTime() {
    return true
    const today = new Date()
    const periodes = await getPeriodes();
    let nextPeriode = null
    let inPeriode = false;
    periodes.forEach(periode => {
        periode.start = new Date(periode.start)
        periode.end = new Date(periode.end)   
        if (periode.start < today && today < periode.end){
            inPeriode = true;        
        }
        if (nextPeriode === null && periode.start > today){
            nextPeriode = periode
        }
    });
    if (inPeriode){
        return inPeriode
    }
    if (nextPeriode === null){
        return "Désolé, les SOS sont terminés pour nous !"
    } else {
        let d = nextPeriode.start
        let hours = d.getHours(),minutes = d.getMinutes(),secondes = d.getSeconds(),day = d.getDate(),month = (d.getMonth()+1),year = d.getFullYear()
        if (hours <10){hours = '0'+hours}
        if (minutes <10){minutes = '0'+minutes}
        if (secondes <10){secondes = '0'+secondes}
        if (day <10){day = '0'+day}
        if (month <10){month = '0'+month}
        return `Vous ne pouvez pas commander maintenant, nous réouvrons à ${hours}:${minutes}:${secondes} le ${day}-${month}-${year}`
    }
}