const { obfuscationOptions, keyResponse } = require('../typings');
const Axios = require('axios');

module.exports = class Obfuscator {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    /**
     * The method used to send requests to psu's api.
     * @param {{ endpoint: string, method: Axios.Method, body: object, headers: object }} options
     */
    async request({ endpoint, method, body, headers }) {
        try {
            const BASE_URL = 'http://api.psu.dev';

            const { data } = await Axios({
                url: `${BASE_URL}${endpoint}`,
                method,
                headers: headers ? headers: null,
                data: body ? body : null,
            });

            return data;
        } catch (err) {
            throw new Error(err.response.data);
        }
    }

    /**
     * Obfuscate a script.
     * @param {{ script: string, options: obfuscationOptions }} options
     */
    async obfuscate({ script, options }) {
        const body = JSON.stringify({
            key: this.apiKey,
            script,
            options,
        });

        return await this.request({
            endpoint: '/obfuscate',
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * Check the statistics on your key.
     * @return {keyResponse}
     */
    async getKey() {
        return await this.request({
            endpoint: '/key',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'key': key,
            },
        });
    }
};
