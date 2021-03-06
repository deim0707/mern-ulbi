import axios from "axios";
import UserApi from "./user.service";
import FileApi from "./file.service";

const BACKEND_URL = "http://localhost:5000";
const BASE_URL = `${BACKEND_URL}/api`;

class ApiService {
    constructor() {
        this._apiClient = axios.create();
        this.UserApi = new UserApi(this._apiClient, BASE_URL);
        this.FileApi = new FileApi(this._apiClient, BASE_URL);
    }
}

export default new ApiService();