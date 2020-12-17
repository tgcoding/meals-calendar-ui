class TokenService {
    static get ACCESS_TOKEN() {
        return "accessToken";
    }

    static removeToken() {
        localStorage.removeItem(this.ACCESS_TOKEN);
    }

    static getToken() {
        return localStorage.getItem(this.ACCESS_TOKEN);
    }

    static setToken(token) {
        localStorage.setItem(this.ACCESS_TOKEN, token);
    }

    static tokenExists() {
        return (localStorage.getItem(this.ACCESS_TOKEN) != null);
    }
}

export default TokenService;