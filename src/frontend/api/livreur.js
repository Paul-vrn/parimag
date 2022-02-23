import Api from "./api";

export const getLivreurs = async () => {
    try {
      const response = await Api.get("livreurs");
      return response;
    } catch (error) {
      console.error(error);
    }
};

export const updateLivreur = async (id, livreur) => {
  try {
    const response = await Api.patch(`livreurs/${id}`, livreur)
    return response;
  } catch (error){
    console.log(error)
  }
}

