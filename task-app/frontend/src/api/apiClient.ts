import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://totally-fleet-worm.ngrok-free.app/", // Usa variables de entorno
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptores para manejar tokens, errores, etc.
apiClient.interceptors.request.use((config) => {
    return config;
});

export default apiClient;