import {getPeriodes} from '../api/periode'

export async function checkTime() {
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

        return `Vous ne pouvez pas commander maintenant, nous réouvrons à ${d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()} le ${d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear()}`
    }
}