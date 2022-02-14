import { getQGs } from "../api/qg"
import { createCommande } from "../api/commande"
import { createDetailCommande } from "../api/detailCommande"
export async function commande(commandeEnCours, serviceGoogleDistance) {

    let request = {
        travelMode: google.maps.TravelMode.BICYCLING,
        origins:[{placeId:""}],
        destinations:[{placeId:""}],
    }
    console.log("service commande")
    console.log(commandeEnCours)
    const qgs = await getQGs()
    let trajets = []
    for (let qg of qgs) {
        request.origins[0].placeId = qg.place_id
        request.destinations[0].placeId = commandeEnCours.adresse.place_id
        await serviceGoogleDistance.getDistanceMatrix(request)
            .then(res => {
                trajets.push(res)
                qg.time = res.rows[0].elements[0].duration.value
            })
            .catch(err => console.log(err))
    }
    qgs.sort((qg1, qg2) => (qg1.time > qg2.time) ? 1 : -1) // trie les qgs dans l'ordre du plus proche au moins proche
    commandeEnCours.qg = qgs[0]
    
    createCommande({
        code:commandeEnCours.code,
        adresse:commandeEnCours.adresse.description,
        tel:commandeEnCours.tel,
        etat:"en attente de payement",
        QGNom:commandeEnCours.qg.nom
    })
        .then(res => {
            for (let produit in commandeEnCours.panier){
                createDetailCommande({
                    commandeId:commandeEnCours.code,
                    produitId:produit.id,
                    quantite:produit.quantite
                })
            }        
        })

}