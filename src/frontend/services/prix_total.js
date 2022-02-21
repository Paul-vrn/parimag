module.exports.prixTotal = (panier) => {
    let prix = 0
    panier.forEach(prod => {
        prix += prod.quantite*prod.prix
    });
    return prix.toFixed(2)
}