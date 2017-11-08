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
            "./src/server-app/src/db/entity/**/*.ts"
        ],
        migrations: [
            "./src/server-app/src/db/migration/**/*.ts"
        ],
        subscribers: [
            "./src/server-app/src/db/subscriber/**/*.ts"
        ],
        cli: {
            "entitiesDir": "./src/server-app/src/db/entity",
            "migrationsDir": "./src/server-app/src/db/migration",
            "subscribersDir": "./src/server-app/src/db/subscriber"
        }
    }
};

export { config };