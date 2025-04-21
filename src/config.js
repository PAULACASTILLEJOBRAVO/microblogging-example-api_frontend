const config = {
    baseURL_API: process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_APIURI_DEV
    : process.env.REACT_APP_APIURI_PROD
}
export default config;