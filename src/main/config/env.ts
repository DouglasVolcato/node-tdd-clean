import { config } from "dotenv";
config();

export default {
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/node-tdd-clean",
  port: process.env.PORT || 5050,
};
