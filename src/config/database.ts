import env from "./env";
import { Sequelize } from "sequelize";
import Logger from "../utils/logger";


export const sequelize = new Sequelize( 
  env.DB_NAME, env.DB_USER, env.DB_USER_PASSWORD,
  {
    dialect: env.DB_DIALECT,
    host: env.DB_HOST,
    logging: false
  }
)

export const connectSQL = async () => {
  try {
    // Authenticate the database connection
    await sequelize.authenticate();
    Logger.log("✅ Relational Database connected successfully!");

    // Sync models based on the environment
    if (env.NODE_ENV === "development") {
      await sequelize.sync({ force: false }); // Use `force: true` to reset tables in development
      Logger.log("✅ Database schema synchronized (development mode).");
    } else if (env.NODE_ENV === "production") {
      await sequelize.sync({ alter: true }); // Use `alter: true` to apply non-destructive changes
      Logger.log("✅ Database schema synchronized (production mode).");
    }
  } catch (error) {
    Logger.error(`❌ SQL Database connection error: ${error.message}`);
  }
};

// export const connectNoSQL = async() => {
//   try {
//     await mongoose.connect(env.MONGO_URI, {});
//     Logger.log("✅ NoSQL Database connected successfully!");
//   } catch (error) {
//     Logger.error(`❌ NoSQL Database connection error: ${error}`);
//   }
// }