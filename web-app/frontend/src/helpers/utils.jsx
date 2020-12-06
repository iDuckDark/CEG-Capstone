/* eslint-disable no-console */
export const isServerSideRendering = () => typeof window === "undefined";

export const detectMob = () => {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
    ];
    if (isServerSideRendering()) return false;
    return toMatch.some(toMatchItem => {
        return navigator.userAgent.match(toMatchItem);
    });
};

const { warn } = console;
export function logWarning(...warnings) {
    let showWarning = true;
    warnings.forEach(warning => {
        if (warning.includes("UNSAFE_")) showWarning = false;
        else if (warning.includes("SourceMap")) showWarning = false;
        else if (warning.includes("DevTools")) showWarning = false;
    });
    if (showWarning) warn(...warnings);
}

console.warn = logWarning;
