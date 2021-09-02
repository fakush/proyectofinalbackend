"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatMessages = (data) => {
    const { username, text, time } = data;
    return {
        username,
        text,
        time
    };
};
exports.default = formatMessages;
