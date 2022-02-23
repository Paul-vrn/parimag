import Api from "./api";

export const getBanderoles = async () => {
    try {
      const response = await Api.get("banderoles");
      return response;
    } catch (error) {
      console.error(error);
    }
};

export const getBanderole = async (id) => {
  try {
    const response = await Api.get(`banderoles/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const updateBanderole = async (id, banderole) => {
  try {
    const response = await Api.patch(`banderoles/${id}`, banderole)
    return response;
  } catch (error) {
    console.log(error)
  }
}