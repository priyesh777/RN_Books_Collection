import axios, { AxiosResponse } from "axios";
import BookDetail from "../types/bookDetail";
import { baseUrl } from "./users";
import { getToken } from "../data/token";

//Type interface for Registering User
export interface BookPayload {
    booksName: string;
    isbn: string;
    rating: string;
    author: string;
    genre: string;
    description: string;
}

//API to get all the books
export const getBooks = async (): Promise<AxiosResponse<BookDetail[]>> => {
    const token = await getToken();
    console.log("Token saved in local::>>", token);
    return axios({
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "get",
        url: `${baseUrl}/books`,
    });
};

//API to get a particular book
export const getEachBook = async (bookId: string): Promise<AxiosResponse<BookDetail[]>> => {
    const token = await getToken();
    console.log("Token saved in local::>>", token);
    return axios({
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "get",
        url: `${baseUrl}/books/${bookId}`,
    });
};

//API to delete a particular book
export const deleteBook = async (bookId: string): Promise<AxiosResponse<BookDetail[]>> => {
    const token = await getToken();
    console.log("Token saved in local::>>", token);
    return axios({
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "delete",
        url: `${baseUrl}/books/${bookId}`,
    });
};

//API to create new book
export const createNewBook = async (payloadData: BookPayload): Promise<AxiosResponse<BookDetail[]>> => {
    const token = await getToken();
    console.log("Token saved in local::>>", token);
    return axios({
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "post",
        url: `${baseUrl}/books`,
        data: payloadData,
    });
};

//API to Edit existing book
export const editBookDetail = async (bookId: string, payloadData: BookPayload): Promise<AxiosResponse<BookDetail[]>> => {
    const token = await getToken();
    console.log("Token saved in local::>>", token);
    return axios({
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: "put",
        url: `${baseUrl}/books/${bookId}`,
        data: payloadData,
    });
};