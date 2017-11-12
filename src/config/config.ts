import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

export interface IConfig {
    port: number | string;
    prettyLog: boolean;
    dbConnection: PostgresConnectionOptions
}

const config: IConfig = {
    port: process.env.NODE_PORT || 3000,
    prettyLog: process.env.NODE_ENV == 'development',
    dbConnection: {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "random",
        password: "random",
        database: "randomdb",
        synchronize: true,
        logging: true,
        entities: [
            "./src/db/entity/**/*.ts"
        ],
        migrations: [
            "./src/db/migration/**/*.ts"
        ],
        subscribers: [
            "./src/db/subscriber/**/*.ts"
        ],
        cli: {
            "entitiesDir": "./src/db/entity",
            "migrationsDir": "./src/db/migration",
            "subscribersDir": "./src/db/subscriber"
        }
    }
};

export { config };