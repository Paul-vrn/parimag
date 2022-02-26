module.exports.checkPanier = (panier) => {
    //poix max = 3 plats, 3 desserts, 3 entrées, 3 boissons
    //max 10 boissons
    //max 3 plats du jour
    //max 6 croc monsieur
    //max 3 desserts
    //max 10 crêpes
    let poidsPlat = 0;
    let poidsDessert = 0;
    let poidsBoisson = 0;
    panier.filter(prod => prod.type === "Plat").forEach(prod => {poidsPlat+=prod.quantite});
    if (poidsPlat>3) {
        return "Votre panier est trop lourd"
    }
    panier.filter(prod => prod.type==="Dessert" && prod.nom!=="Crêpes").forEach(prod => poidsDessert+=prod.quantite);
    if (poidsDessert>3){
        return "Vous ne pouvez prendre un maximum de 3 desserts (sauf crêpes)"
    }
    panier.filter(prod => prod.type==="Boisson").forEach(prod => poidsBoisson+=prod.quantite);
    if (poidsBoisson>10){
        return "Vous ne pouvez pas prendre plus de 10 boissons au total"
    }          
    return true  
}