import axios from "axios";

const url = "https://localhost:5432/api/";

const user = {
  get: () => axios.get(url + "users"),
  post: (data) => axios.post(url + "users", data),
};

export default user;