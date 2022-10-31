import { config } from "dotenv";
config();

export default {
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/node-tdd-clean",
  port: process.env.PORT || 5050,
  jwtSecret: process.env.SECRET || "hsd83WHD44kf9W7",
};
