module.exports.checkPanier = (panier) => {
    //poix max = 3 plats, 3 desserts, 3 entrées, 3 boissons
    let poidsPlat = 0;
    panier.filter(prod => prod.type === "Plat").forEach(prod => {poidsPlat+=prod.quantite});
    if (poidsPlat>3) {
        return "Votre panier est trop lourd"
    } else {
        return true
    }
}