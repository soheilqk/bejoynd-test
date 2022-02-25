import axios from "axios";

const api = axios.create({
  baseURL: "https://poetrydb.org/",
  headers: {
    "content-type": "application/json",
  },
});

export const getRandomPoem = async (count) => {
  return await api
    .get(`random/${count}`)
    .then((rs) => {
      return { success: true, data: rs.data };
    })
    .catch((err) => {
      console.log(err);
      return { success: false, data: [] };
    });
};
