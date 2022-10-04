import axios from "axios";
import API_BASE_URL from "../constants";
class ApiClient {
    // constructor function that accepts a single parameter - `remoteHostUrl`.
    // The constructor should attach the `remoteHostUrl` parameter to a new instance
    // with `this.remoteHostUrl = remoteHostUrl`. It should also set `this.token = null`
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
        this.tokenName = "flashcards_token";
    }

    // method called `setToken` that accepts a single
    // parameter - `token` and attaches it to the instance
    setToken(token) {
        this.token = token;
        localStorage.setItem(this.tokenName, token);
    }

    // Create a utility method called `request` that uses `axios`
    // to issue HTTP requests
    async request({ endpoint, method = `GET`, data = {} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`;

        const headers = {
            "Content-Type": "application/json",
        };

        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }
        try {
            const res = await axios({ url, method, data, headers });
            return { data: res.data, error: null };
        } catch (error) {
            console.error({ errorResponse: error.response });
            const message = error?.response?.data?.error?.message;
            return { data: null, error: message || String(error) };
        }
    }

    async ping() {
        return await this.request({
            endpoint: `flashcard/ping`,
            method: `GET`,
        });
    }

    async getAPublicSet(setId) {
        return await this.request({
            endpoint: `flashcard/`,
            method: `POST`,
            data: { id: setId },
        });
    }

    async queryPublicSets(searchQuery) {
        return await this.request({
            endpoint: `flashcard/search`,
            method: `POST`,
            data: { searchQuery },
        });
    }

    // Add a `login` method that uses the `request` method to send an
    // HTTP request to the `auth/login` endpoint
    async loginUser(credentials) {
        const response = await this.request({
            endpoint: `auth/login`,
            method: `POST`,
            data: credentials,
        });
        this.setToken(response.data?.token);
        return response;
    }

    // Add a `signup` method that uses the `request` method to send an HTTP
    // request to the `auth/register` endpoint
    async signupUser(credentials) {
        return await this.request({
            endpoint: `auth/register`,
            method: `POST`,
            data: credentials,
        });
    }

    // Add a `fetchUserFromToken` method that uses the `request` method to send an HTTP
    // request to the `auth/me` endpoint
    async fetchUserFromToken() {
        return await this.request({ endpoint: `auth/me`, method: `GET` });
    }

    // method to update a user's profile
    async updateProfile(credentials) {
        return await this.request({
            endpoint: `auth/me`,
            method: `PUT`,
            data: credentials,
        });
    }

    // method to logout user
    async logoutUser() {
        this.setToken(null);
        localStorage.setItem(this.tokenName, "");
    }

    // method to create a user's set
    async createUserSet(set) {
        return await this.request({
            endpoint: `flashcard/mysets`,
            method: `POST`,
            data: {...set},
        });
    }

    // method to fetch a user's sets
    async fetchUserSets() {
        return await this.request({
            endpoint: `flashcard/mysets`,
            method: `GET`,
        });
    }
}
export default new ApiClient(API_BASE_URL || "http://localhost:3001");
