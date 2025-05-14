import api from "../api";

const places = () => {
  const getAllPlaces = async ({ location }) => {
    return await api.get(`/places?location=${location || ""}`);
  };

  const getMyPlaces = async () => {
    return await api.get("/places/my");
  };

  const bookPlace = async ({ placeId, days }) => {
    return await api.post("/places/book", { placeId, days });
  };

  return { getAllPlaces, bookPlace, getMyPlaces };
};

export default places;
