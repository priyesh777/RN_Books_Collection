import axios, { AxiosResponse } from "axios";
import BookDetail from "../types/bookDetail";
import { baseUrl } from "./users";
import { getToken } from "../data/token";

export const getBooks = async (): Promise<AxiosResponse<BookDetail[]>> => {
  const token = await getToken();
  return axios({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "get",
    url: `${baseUrl}/books`,
  });
};
