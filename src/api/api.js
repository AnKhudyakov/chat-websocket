import axios from "axios";

const HEADERS = {
  "Content-Type": "application/json",
  accept: "application/json",
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: HEADERS,
});

export const API = {
  async postReg(dataForm) {
    return instance
      .post(`/auth/register/`, { ...dataForm })
      .then((response) => response.data);
  },
  async getMessages() {
    return instance.get(`/messages`).then((response) => response.data);
  },
};
