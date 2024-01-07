import axios, {AxiosResponse} from "axios";
import {BASE_URL} from "@/constraint";

export class DataApi {
    constructor(public url: string) {
        this.url = BASE_URL + url;
    }

    create(data: any): Promise<any> {
        const apiUrl = `${this.url}`;

        // Use Axios to make the API call
        return axios.post(apiUrl, data)
            .then((response: AxiosResponse) => {
                // Handle the successful response
                return response;
            })
            .catch((error) => {
                // Handle errors
                console.error('Error creating resource:', error);
                throw error; // Rethrow the error if needed
            });
    }

    getList(): Promise<any> {
        const apiUrl = `${this.url}`;

        // Use Axios to make the API call
        return axios.get(apiUrl)
            .then((response: AxiosResponse) => {
                // Handle the successful response
                return response;
            })
            .catch((error) => {
                // Handle errors
                console.error('Error creating resource:', error);
                throw error; // Rethrow the error if needed
            });
    }

}