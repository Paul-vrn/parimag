import Api from "./api";

export const getPeriodes = async () => {
    try {
      const response = await Api.get("periodes");
      return response;
    } catch (error) {
      return {error:error.response.data}
    }
};

export const getPeriode = async (id) => {
  try {
    const response = await Api.get(`periodes/${id}`);
    return response;
  } catch (error) {
    return {error:error.response.data}
  }
}

export const updatePeriode = async (id, banderole) => {
  try {
    const response = await Api.patch(`periodes/${id}`, banderole)
    return response;
  } catch (error) {
    return {error:error.response.data}
  }
}