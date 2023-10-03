import axios from "axios";

const setHeaderRequest = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `BEARER ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setHeaderRequest;
