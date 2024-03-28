import axios from "axios";

const API_URL = "http://localhost:8000/api";

export function getTasks(token) {
    return axios.get(`${API_URL}/tasks`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        }
    });
}

export function createTask(token, data) {
    return axios.post(`${API_URL}/tasks`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        }
    });
}

export function updateTask(token, id, data) {
    return axios.put(`${API_URL}/tasks/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        }
    });
}

export function deleteTask(token, id) {
    return axios.delete(`${API_URL}/tasks/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        }
    });
}

export function completeTask(token, id) {
    return axios.post(`${API_URL}/tasks/complete/${id}`, {
        status: "done"
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        }
    });
}