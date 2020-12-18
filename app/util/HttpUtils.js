import axios from "axios";
import EnvConstants from "../constants/EnvConstants";
import TokenService from "../services/TokenService";

class HttpUtils {
    static #config = { headers: {} };

    static get(endpoint, external, externalConfig) {
        let url = EnvConstants.API_PATH + endpoint;

        let config = { ...this.#config };
        if (TokenService.tokenExists()) {
            config.headers = { ...config.headers, Authorization: "Bearer " + TokenService.getToken() };
        }

        if (external === true) {
            url = endpoint;
            config = externalConfig || {};
        }

        const response = axios.get(url, config || {});
        return response;
    }

    static post(endpoint, data, external, externalConfig) {
        let url = EnvConstants.API_PATH + endpoint;

        let config = { ...this.#config };
        if (TokenService.tokenExists()) {
            config.headers = { ...config.headers, Authorization: "Bearer " + TokenService.getToken() };
        }

        if (external === true) {
            url = endpoint;
            config = externalConfig || {};
        }
        const response = axios.post(url, data, config || {});
        return response;
    }

    static put(endpoint, data, external, externalConfig) {
        let url = EnvConstants.API_PATH + endpoint;

        let config = { ...this.#config };
        if (TokenService.tokenExists()) {
            config.headers = { ...config.headers, Authorization: "Bearer " + TokenService.getToken() };
        }

        if (external === true) {
            url = endpoint;
            config = externalConfig || {};
        }
        const response = axios.put(url, data, config || {});
        return response;
    }
}

export default HttpUtils;
