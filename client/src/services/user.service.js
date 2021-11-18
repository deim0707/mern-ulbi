import {getToken} from "../shared/localStorageUtils";

const USER_URLS = {
    root: 'auth',
    login: 'login',
    registration: 'registration',
    authorization: 'auth',
}

class UserApi {
    constructor(client, baseUrl) {
        this.baseUrl = baseUrl;
        this.client = client;
    }

    async registration(user) {
        await this.client.post(`${this.baseUrl}/${USER_URLS.root}/${USER_URLS.registration}`, user)
    }

    login(user) {
        return this.client
            .post(`${this.baseUrl}/${USER_URLS.root}/${USER_URLS.login}`, user)
            .then((response) => response.data)
    }

    // срабатывает, когда есть токен, но нет авторизованного пользователя
    authorization() {
        const token = getToken();
        return this.client
            .get(
                `${this.baseUrl}/${USER_URLS.root}/${USER_URLS.authorization}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then((response) => response.data)
    }
}

export default UserApi;