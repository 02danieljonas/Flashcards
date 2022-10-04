export const PRODUCTION_API_BASE_URL = "https://flashi-w11.herokuapp.com";
export const DEVELOPMENT_API_BASE_URL = "http://localhost:3001";

let isDev;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    isDev = true;
    // dev code
} else {
    isDev = false;
    // production code
}

const API_BASE_URL = isDev ? DEVELOPMENT_API_BASE_URL : PRODUCTION_API_BASE_URL;

export default API_BASE_URL;
