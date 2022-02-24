import Api from "./api";

export const getBlogs = async () => {
    try {
      const response = await Api.get("json/blogs");
      return response;
    } catch (error) {
      return {error:error.response.data}
    }
};