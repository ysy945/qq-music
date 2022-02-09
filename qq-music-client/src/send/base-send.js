import axios from "axios";

const options = {
  baseURL: "http://localhost:4000",
};
const developAxios = axios.create(options);

export default developAxios;
