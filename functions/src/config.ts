import {
  ConnectionOptions,
  Connection,
  createConnection,
  getConnection,
} from "typeorm";
import "reflect-metadata";

// Will be true on deployed functions
export const prod = process.env.NODE_ENV === "production";

export const config: ConnectionOptions = {
  name: "fun",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres", // review
  password: "docker", // review
  database: "development",
  synchronize: true,
  logging: false,
  entities: ["lib/entities/**/*.js"],

  // Production Mode
  ...(prod && {
    database: "production",
    logging: false,
    // synchronize: false,
    extra: {
      socketPath: "/cloudsql/direns-sti:us-central1:santana-pg", // change
    },
  }),
};

export const connect = async () => {
  let connection: Connection;

  try {
    connection = getConnection(config.name);
    console.log(connection);
  } catch (err) {
    connection = await createConnection(config);
  }

  return connection;
};
