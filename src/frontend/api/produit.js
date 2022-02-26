import Api from "./api";

export const getProduits = async () => {
    try {
      const response = await Api.get("produits");
      return response;
    } catch (error) {
      return {error:error.response.data}
    }
};