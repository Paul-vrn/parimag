import { getQGs } from "../api/qg"
import { createCommande } from "../api/commande"
import { createDetailCommande } from "../api/detailCommande"
import { commander } from "../api/commander"
import {updateStock} from '../api/stock'
export async function commande(commandeEnCours, serviceGoogleDistance) {
    let id;
    let request = {
        travelMode: google.maps.TravelMode.BICYCLING,
        origins:[{placeId:""}],
        destinations:[{placeId:""}],
    }
    const qgs = await getQGs()
    let trajets = {}
    for (let qg of qgs) {
        request.origins[0].placeId = qg.place_id
        request.destinations[0].placeId = commandeEnCours.adresse.place_id
        await serviceGoogleDistance.getDistanceMatrix(request)
            .then(res => {
                qg.time = res.rows[0].elements[0].duration.value
                trajets[qg.nom] = qg.time
            })
            .catch(err => {
                    console.log(err)
                    //maintenant qu'on a enlevé les place_id, on aura toujours des erreurs mais pas grave.
                })
    }
    qgs.sort((qg1, qg2) => (qg1.time > qg2.time) ? 1 : -1) // trie les qgs dans l'ordre du plus proche au moins proche
    commandeEnCours.qg = qgs[0]
    commandeEnCours.trajets = JSON.stringify(trajets)    
    console.log(commandeEnCours)

    const response = await commander(commandeEnCours)
    return response.id
}