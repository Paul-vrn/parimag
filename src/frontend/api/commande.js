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

export const getCommandesSuivi = async() => {
  try {
    const response = await Api.get('commandes/suivi');
    return response;
  } catch (error) {
    return {error:error.response.data}
  }
}

export const updateCommande = async (id, commande) => {
  try {
    const response = await Api.patch(`commandes/${id}`, commande)
    return response;
  } catch (error){
    return {error:error.response.data}
  }
}

export const deleteCommande = async (id) => {
  try {
    const response = await Api.delete(`commandes/${id}`)
    return response;
  } catch (error){
    return {error:error.response.data}
  }  
}