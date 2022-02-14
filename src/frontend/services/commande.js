import { getQGs } from "../api/qg"
export async function commande(commandeEnCours, serviceGoogleDistance) {

    let request = {
        travelMode: google.maps.TravelMode.BICYCLING,
        origins:[{placeId:""}],
        destinations:[{placeId:""}],
    }
    console.log("service commande")
    const qgs = await getQGs()
    let trajets = []
    for (let qg of qgs) {
        request.origins[0].placeId = qg.place_id
        request.destinations[0].placeId = commandeEnCours.adresse.place_id
        await serviceGoogleDistance.getDistanceMatrix(request)
            .then(res => {
                trajets.push(res)
            })
            .catch(err => console.log(err))
    }
    console.log(trajets)
    // rows[0].elements[0].duration.value ==> le plus petit ==> qg à prendre
}