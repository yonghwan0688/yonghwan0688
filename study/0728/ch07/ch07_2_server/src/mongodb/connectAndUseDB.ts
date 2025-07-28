import { MongoClient, Db } from "mongodb";

export type MongoDB = Db;
export type ConnectCallback = (db: MongoDB) => void;

export const connectAndUseDB = async (
  callback: ConnectCallback,
  dbName: string,
  mongoUrl: string = "mongodb://localhost:27017"
) => {
  let conncection;
  try {
    conncection = await MongoClient.connect(mongoUrl);
    const db = conncection.db(dbName);
    callback(db);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
};
