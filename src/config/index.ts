import dotenv from 'dotenv';
dotenv.config();

export const ENVIRONMENTS = {
    DYNAMO_ENDPOINT: process.env.MONGODB_ENDPOINT || "mongodb://localhost:project2",
}