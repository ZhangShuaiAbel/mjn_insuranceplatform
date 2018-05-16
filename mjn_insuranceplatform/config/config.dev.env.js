module.exports = {
    isEnv: process.env.NODE_ENV === 'development' ? true : false,
    env: process.env.NODE_ENV,
    // 开发环境baseurl
    envBaseUrl: 'http://is.mujinnong.com', 
    // 生产环境baseurl
    prodBaseUrl: 'http://is.mujinnong.com'
} 
