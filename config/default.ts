import { EnviromentType } from "./enums/EnviromentType"

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbURI = process.env.DB_URI

export default {
    port: 3000,
    dbUser: dbUser,
    dbPass: dbPass,
    dbURI: dbURI,
    env: EnviromentType.DEVELOPMENT
}
