import api from "../api";

const users = () => {
  const login = async ({ login, password }) => {
    return await api.post(`users/login`, {
      login,
      password,
    });
  };

  const register = async ({ name, login, password }) => {
    return await api.post(`users/register`, {
      name,
      login,
      password,
    });
  };

  const current = async () => {
    return await api.get(`users/`);
  };

  return { login, register, current };
};

export default users;
