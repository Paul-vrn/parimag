import Api from "./api";

export const getLivreurs = async () => {
    try {
      const response = await Api.get("livreurs");
      return response;
    } catch (error) {
      console.error(error);
    }
};