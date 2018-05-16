let config = require('../../../config/config.dev.env');

let isEnv = config.isEnv;
let prodBaseUrl = config.prodBaseUrl;

export default {
    baseURL: isEnv ? '/api/' : prodBaseUrl,
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
    withCredentials: true  // 携带cookie
}