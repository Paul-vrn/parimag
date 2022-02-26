import Api from "./api";

export const createDetailCommande = async(detailcommande) => {
    try {
      const response = await Api.post("detailCommandes", detailcommande);
      return response;
    } catch (error) {
      return {error:error.response.data}
    }
};


