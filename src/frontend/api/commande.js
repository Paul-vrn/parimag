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
