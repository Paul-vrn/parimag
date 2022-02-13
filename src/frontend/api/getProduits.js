// pokemon.js
// Implementations for all the calls for the pokemon endpoints.
import Api from "./api";

// Method to get a list of all Pokemon
export const getProduits = async () => {
    try {
      const response = await Api.get("json/produits");
      return response;
    } catch (error) {
      console.error(error);
    }
};