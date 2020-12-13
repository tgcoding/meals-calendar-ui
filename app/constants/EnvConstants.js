class EnvConstants {
    static get API_PATH() {
        const envUrl = "http://localhost:8080";
        const path = "/meals-calendar/api";
        return envUrl + path;
    }
}

export default EnvConstants;
