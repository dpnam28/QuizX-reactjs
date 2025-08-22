import axios from "../utils/axiosCustomize";
export const createNewParticipant = (
  email,
  password,
  username,
  role,
  image
) => {
  let data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};

export const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};

export const putUpdateUser = (id, username, role, image) => {
  let data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};
