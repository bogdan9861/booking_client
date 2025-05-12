import api from "../api";

const places = () => {
  const getAll = async () => {
    return await api.get("/places");
  };

  return { getAll };
};

export default places;
