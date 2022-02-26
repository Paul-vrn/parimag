import Api from "./api";

export const createCommande = async(commande) => {
    try {
      const response = await Api.post("commandes", commande);
      return response;
    } catch (error) {
      return {error:error.response.data}
    }
};

export const getCommandes = async() => {
  try {
    const response = await Api.get('commandes');
    return response;
  } catch (error) {
    return {error:error.response.data}
  }
}

export const updateCommande = async (code, commande) => {
  try {
    const response = await Api.patch(`commandes/${code}`, commande)
    return response;
  } catch (error){
    return {error:error.response.data}
  }
}

export const deleteCommande = async (code) => {
  try {
    const response = await Api.delete(`commandes/${code}`)
    return response;
  } catch (error){
    return {error:error.response.data}
  }  
}