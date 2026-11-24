import Vue from 'vue';
import axios from 'axios';

const token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

export function setCsrfToken(token) {
    if (!token) {
        return;
    }

    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

    const meta = document.head.querySelector('meta[name="csrf-token"]');

    if (meta) {
        meta.content = token;
    }
}

const api = {
    async get(url, config) {
        return (await axios.get(url, config)).data;
    },
    async post(url, data, config) {
        return (await axios.post(url, data, config)).data;
    },
    async put(url, data, config) {
        return (await axios.put(url, data, config)).data;
    },
    async delete(url, config) {
        return (await axios.delete(url, config)).data;
    },
};

export function errorMessage(error, fallback = 'Не удалось выполнить запрос') {
    const data = error?.response?.data;

    if (data?.message) {
        return data.message;
    }

    if (data?.errors) {
        return Object.values(data.errors).flat().join(' ');
    }

    return fallback;
}

export default api;
