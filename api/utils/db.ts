import {createPool} from "mysql2/promise";
import {config} from "../config/config";







export const pool = createPool({
    host: config.dbHost,
    user: config.dbUser,
    database: config.dbDatabase,
    password: config.dbPassword,
    namedPlaceholders: true,
    decimalNumbers: true,

});




