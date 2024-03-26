import axios from "axios";

const API_URL = "http://localhost:8000/api";

export function login(email, password) {
    return axios.post(`${API_URL}/login`, {
        email,
        password
    });
}

export function register(name, email, password) {
    return axios.post(`${API_URL}/register`, {
        name,
        email,
        password
    });
}

export function logout(token) {
    return axios.post(`${API_URL}/logout`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        }
    });
}

export function refresh(token) {
    return axios.post(`${API_URL}/refresh`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        }
    });
}