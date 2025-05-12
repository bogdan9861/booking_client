import places from "./endpoints/places";
import user from "./endpoints/users";

const service = () => {
  const usersEndpoints = user();
  const placesEndpoints = places();

  return {
    ...usersEndpoints,
    ...placesEndpoints,
  };
};

export default service;
