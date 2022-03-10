import Api from "./api";

export const getProduits = async () => {
    try {
      const response = await Api.get("produits");
      return response;
    } catch (error) {
      return {error:error.response.data}
    }
};

export const updateProduit = async (id, body) => {
  try {
    const response = await Api.patch(`produits/${id}`, body)
    return response;
  } catch (error) {
    return {error:error.response.data}
  }
}