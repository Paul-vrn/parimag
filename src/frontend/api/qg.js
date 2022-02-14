import Api from "./api";

export const getQGs = async () => {
    try {
      const response = await Api.get("qgs");
      return response;
    } catch (error) {
      console.error(error);
    }
};