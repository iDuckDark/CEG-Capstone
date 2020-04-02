import { isServerSideRendering } from "./utils";

const KEY_DEFAULT_URL = "defaultUrl";

const KEY_DEFAULT_PATH = "/";

const defaultUrl = "https://45.72.149.128:8000/";

const workingUrl = "https://www.youtube.com/embed/Q-TEYBltFis";

// Video

const getVideoUrl = () => {
    if (!isServerSideRendering())
        return localStorage.getItem(KEY_DEFAULT_URL) || defaultUrl;
    return workingUrl;
};

const setVideoUrl = url => {
    if (!isServerSideRendering()) localStorage.setItem(KEY_DEFAULT_URL, url);
};

const trimPath = path => {
    const { length } = path;
    if (length === 1) return path;
    if (path[length - 1] === "/") return path.slice(0, -1);
    return path;
};

const getCurrentPath = () => {
    if (!isServerSideRendering()) return trimPath(window.location.pathname);
    return "/";
};

export { defaultUrl, getCurrentPath, getVideoUrl, setVideoUrl, workingUrl };
