import Api from "./api";

export const getListe = async () => {
    try {
      const response = await Api.get("json/liste");
      return response;
    } catch (error) {
      console.error(error);
    }
};