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

export const shuffle = array => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    const temp = array;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        temp[currentIndex] = array[randomIndex];
        temp[randomIndex] = temporaryValue;
    }
    return temp;
};

export const cleaner = (name, min, max, size) => {
    const data = [];
    for (let i = 0; i < size; i += 1) {
        const temp = Math.random() * (max - min) + min;
        const obj = {};
        obj[name] = temp;
        data.push(obj);
    }
    return data;
};

export const cleanerFloat = (min, max) => {
    const decimalPlaces = 9;
    const rand = Math.random() * (max - min) + min;
    // eslint-disable-next-line no-restricted-properties
    const power = Math.pow(10, decimalPlaces);
    const temp = Math.floor(rand * power) / power;
    return temp;
};
