import api from "../api";

const places = () => {
  const createPlace = async (data) => {
    return await api.post("/places", data);
  };

  const getAllPlaces = async ({ location }) => {
    return await api.get(`/places?location=${location || ""}`);
  };

  const getMyPlaces = async () => {
    return await api.get("/places/my");
  };

  const bookPlace = async ({ placeId, days }) => {
    return await api.post("/places/book", { placeId, days });
  };

  const removePlace = async (id) => {
    return await api.delete(`/places/${id}`);
  };

  return { getAllPlaces, bookPlace, getMyPlaces, createPlace, removePlace };
};

export default places;
