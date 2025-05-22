import axios from "axios";

const API_URL = "https://evangadi-q-a-1.onrender.com/api/users";

const getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/profile`, config);
  return response.data;
};

const updateProfile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/profile`, profileData, config);
  return response.data;
};

const changePassword = async (passwordData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_URL}/change-password`,
    passwordData,
    config
  );
  return response.data;
};

const profileService = {
  getProfile,
  updateProfile,
  changePassword,
};

export default profileService;
