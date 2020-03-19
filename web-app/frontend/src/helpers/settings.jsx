import { isServerSideRendering } from "./utils";

const KEY_DEFAULT_URL = "defaultUrl";

const KEY_DEFAULT_PATH = "/";

const defaultUrl = "https://45.72.149.128:8000/";

const workingUrl = "https://www.youtube.com/embed/Q-TEYBltFis";

// Video

const getVideoUrl = () => {
    if (!isServerSideRendering())
        return localStorage.getItem(KEY_DEFAULT_URL) || defaultUrl;
    return defaultUrl;
};

const setVideoUrl = url => {
    if (!isServerSideRendering()) localStorage.setItem(KEY_DEFAULT_URL, url);
};

// Path
const getPath = () => {
    if (!isServerSideRendering())
        return localStorage.getItem(KEY_DEFAULT_PATH) || "/";
    return "/";
};

const setPath = path => {
    if (!isServerSideRendering()) localStorage.setItem(KEY_DEFAULT_PATH, path);
};

export { defaultUrl, workingUrl, getVideoUrl, setVideoUrl, setPath, getPath };
