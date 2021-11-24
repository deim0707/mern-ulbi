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


}

export default FileApi;