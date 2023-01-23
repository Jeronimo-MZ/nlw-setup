import axios from "axios";

export const api = axios.create({
    baseURL: "https://cdbd-160-119-113-182.ap.ngrok.io",
});
