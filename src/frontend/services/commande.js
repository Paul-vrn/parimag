import { getQGs } from "../api/qg"
import { createCommande } from "../api/commande"
import { createDetailCommande } from "../api/detailCommande"
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
                    return err
                })
    }
    qgs.sort((qg1, qg2) => (qg1.time > qg2.time) ? 1 : -1) // trie les qgs dans l'ordre du plus proche au moins proche
    commandeEnCours.qg = qgs[0]
    commandeEnCours.trajets = JSON.stringify(trajets)    
    
    return createCommande({
        adresse:commandeEnCours.adresse.description,
        tel:commandeEnCours.tel,
        personne:commandeEnCours.personne,
        etat:"EAP",
        trajets:commandeEnCours.trajets,
        QGNom:commandeEnCours.qg.nom,
        commentaire:commandeEnCours.commentaire,
        couverts:commandeEnCours.couverts
    })
        .then(res => {
            for (let produit of commandeEnCours.panier){
                createDetailCommande({
                    commandeId:res.id,
                    produitId:produit.id,
                    quantite:produit.quantite
                })
                if (produit.type!=="Service"){
                    let st = produit.stocks.find(stock => stock.QGNom === commandeEnCours.qg.nom)
                    updateStock(st.id, {quantite:st.quantite-produit.quantite})
                }
            }   
            return res.id;
        })

}