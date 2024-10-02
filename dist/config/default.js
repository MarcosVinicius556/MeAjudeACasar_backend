"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EnviromentType_1 = require("./enums/EnviromentType");
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbURI = process.env.DB_URI;
exports.default = {
    port: 3000,
    dbUser: dbUser,
    dbPass: dbPass,
    dbURI: dbURI,
    env: EnviromentType_1.EnviromentType.DEVELOPMENT
};
