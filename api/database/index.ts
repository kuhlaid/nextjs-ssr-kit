// Since this is being utilized by "seedDB" and "teardownDB" within Jest, paths must be relative

import bluebird from "bluebird";
import mongoose from "mongoose";
import { logErrorMessage, logInfoMessage } from "../../logger";

const { DATABASE_URI, NODE_ENV, DB_POOL_SIZE } = process.env;
const inTesting = NODE_ENV === "test";
const intPoolSize = Number(DB_POOL_SIZE);

const options = {
  poolSize: intPoolSize, // sets the max number of db connections to allow per instance connection pool (https://mongoosejs.com/docs/connections.html); this will not directly apply to local development which somehow seems to create multiple connection pools or does not honor the single instance connection pool cache
  useNewUrlParser: true, // avoids DeprecationWarning: current URL string parser is deprecated
  useCreateIndex: true, // avoids DeprecationWarning: collection.ensureIndex is deprecated.
  useFindAndModify: false, // avoids DeprecationWarning: collection.findAndModify is deprecated.
  useUnifiedTopology: true // avoids DeprecationWarning: current Server Discovery and Monitoring engine is deprecated
};

mongoose.Promise = bluebird;

export const createConnectionToDatabase = (): mongoose.Connection & {
  then: Promise<mongoose.Connection>["then"];
  catch: Promise<mongoose.Connection>["catch"];
} => mongoose.createConnection(`${DATABASE_URI}`, options);

export const connectToDB = (): Promise<typeof mongoose> =>
  mongoose.connect(`${DATABASE_URI}`, options);

if (!inTesting) {
  mongoose.connection.on(
    "connected",
    () => logInfoMessage(`Connected to ${DATABASE_URI}`) // log mongodb connection established
  );

  mongoose.connection.on(
    "disconnected",
    () => logInfoMessage(`Disconnected from ${DATABASE_URI}`) // log mongodb connection disconnected
  );

  mongoose.connection.on(
    "error",
    () => logErrorMessage(`Connection error to ${DATABASE_URI}`) // log mongodb connection error
  );

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      logInfoMessage(`Connection was manually terminated from ${DATABASE_URI}`);
      process.exit(0);
    });
  });
}
