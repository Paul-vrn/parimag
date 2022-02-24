import Api from "./api";

export const getQGs = async () => {
    try {
      const response = await Api.get("qgs");
      return response;
    } catch (error) {
      return {error:error.response.data}
    }
};

export const postQgAuth = async (user) => {
  try {
    const response = await Api.post("qgs/login", user)
    return response;
  } catch (error) {
    return {error:error.response.data}
  }
}