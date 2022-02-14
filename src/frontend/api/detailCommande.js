import Api from "./api";

export const createDetailCommande = async(detailcommande) => {
    try {
      const response = await Api.post("detailcommande", detailcommande);
      return response;
    } catch (error) {
      console.error(error);
    }
};


