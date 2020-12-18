import HttpUtils from "../util/HttpUtils";
import TokenService from "../services/TokenService";

class UserService {
    static getCurrentUser() {
        if (!TokenService.tokenExists()) {
            return Promise.reject(new Error("No access token set."));
        }

        return HttpUtils.get("/user/me");
    }
}

export default UserService;
