import {getPeriodes} from '../api/periode'

export async function checkTime() {
    const periodes = await getPeriodes();
    periodes.forEach(periode => {
        periode.start = new Date(periode.start)
        periode.end = new Date(periode.end)        
    });
    console.log(periodes)
    return ""
}