import {getPeriodes} from '../api/periode'
import { timeParse } from './timeParse';
import { getDate } from './getDate';
export async function checkTime() {
    // sans api :
    return true;
    // avec api :
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
	let date = getDate(d)
        return `Vous ne pouvez pas commander maintenant, nous réouvrons à ${date}`
    }
}
