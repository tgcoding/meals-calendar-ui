class EnvConstants {
    static get API_PATH() {
        const envUrl = (this.ENV_MODE === "development") ? "http://localhost:8080" : "http://localhost";
        const path = "/meals-calendar/api";
        return envUrl + path;
    }

    static get OAUTH_REDIRECT() {
        const envUrl = (this.ENV_MODE === "development") ? "http://localhost:9000" : "http://localhost";
        const path = "/meals-calendar/oauth2/redirect";
        return envUrl + path;
    }

    static get GOOGLE_OAUTH_PATH() {
        const url = this.API_PATH + "/oauth2/authorize/google?redirect_uri=" + this.OAUTH_REDIRECT;
        return url;
    }

    static get OAUTH_LOGOUT() {
        const url = this.API_PATH + "/logout";
        return url;
    }

    static get ENV_MODE() {
        if (process && process.env && process.env.NODE_ENV) {
            return process.env.NODE_ENV;
        }
        return "";
    }
}

export default EnvConstants;
