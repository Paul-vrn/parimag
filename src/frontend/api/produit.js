import Api from "./api";

export const getProduits = async () => {
    try {
      const response = await Api.get("json/produits");
      return response;
    } catch (error) {
      console.error(error);
    }
};