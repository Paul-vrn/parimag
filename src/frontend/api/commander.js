import Api from "./api";

export const commander = async(commande) => {
    try {
      const response = await Api.post("commander", commande);
      return response;
    } catch (error) {
      return {error:error.response.data}
    }
};
