import axios from 'axios';

// Helper function to get the CSRF token from cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/', // Django backend URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    config => {
        config.headers['X-CSRFToken'] = getCookie('csrftoken');
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
