import {getToken} from "../shared/localStorageUtils";

const FILES_URLS = {
    root: 'files',
}

class FileApi {
    constructor(client, baseUrl) {
        this.baseUrl = baseUrl;
        this.client = client;
    }

    getFiles(directoryId) {
        const token = getToken();
        return this.client
            .get(`${this.baseUrl}/${FILES_URLS.root}`,
                {
                    // хорошо бы работу с токеном реализовать 1 раз в 1ом месте
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        parent: directoryId,
                    }
                },
            )
            .then(response => response.data)
    }

    createDirectory(directoryData) {
        const {name, type, parent} = directoryData;
        const token = getToken();
        return this.client
            .post(`${this.baseUrl}/${FILES_URLS.root}`,
                {name, type, parent},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                },
            )
            .then(response => response.data)
    }


}

export default FileApi;