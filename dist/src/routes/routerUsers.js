"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserAuthAPI_1 = require("../apis/UserAuthAPI");
const logger_1 = require("../middleware/logger");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield UserAuthAPI_1.authAPI.findUser;
    res.json({ data });
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email, firstName, lastName } = req.body;
    if (!username || !password || !email || !firstName || !lastName) {
        logger_1.logger.log.debug('Invalid body fields');
        return res.status(400).json({ msg: 'Invalid fields' });
    }
    const userData = { username, password, email, firstName, lastName };
    const newUser = UserAuthAPI_1.authAPI.signUpUser(userData);
    res.json({ data: newUser });
}));
exports.default = router;
