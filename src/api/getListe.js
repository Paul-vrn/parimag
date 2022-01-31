// pokemon.js
// Implementations for all the calls for the pokemon endpoints.
import Api from "./api";

// Method to get a list of all Pokemon
export const getListe = async () => {
    try {
      const response = await Api.get("liste");
      return response;
    } catch (error) {
      console.error(error);
    }
};