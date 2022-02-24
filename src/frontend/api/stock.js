import Api from "./api";

export const getStocks = async () => {
    try {
      const response = await Api.get("stocks");
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

export const updateStock = async (id, stock) => {
  try {
    const response = await Api.patch(`stocks/${id}`, stock)
    return response
  } catch (error) {
    return {error:error.response.data}
  }
}