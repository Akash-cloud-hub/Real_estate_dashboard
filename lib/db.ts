import { Database } from "@/models/types";
import {Pool} from "pg";
import {Kysely, PostgresDialect} from "kysely";


const dialect = new PostgresDialect({
    pool : new Pool({
    connectionString: process.env.DATABASE_URL
})
})

export const db = new Kysely<Database>({
    dialect: dialect
});
