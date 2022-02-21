import Api from "./api";

export const createCommande = async(commande) => {
    try {
      const response = await Api.post("commandes", commande);
      return response;
    } catch (error) {
      console.error(error);
    }
};

export const getCommandes = async() => {
  try {
    const response = await Api.get('commandes');
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const updateCommande = async (code, commande) => {
  try {
    const response = await Api.patch(`commandes/${code}`, commande)
    return response;
  } catch (error){
    console.log(error)
  }
}

export const deleteCommande = async (code) => {
  try {
    const response = await Api.delete(`commandes/${code}`)
    return response;
  } catch (error){
    console.log(error)
  }  
}