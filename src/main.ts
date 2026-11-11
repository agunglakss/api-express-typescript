import express from "express";
import morgan from "morgan";
import { dbConnection } from "./config/db.js";
import errorMiddleware from "./middleware/error.middleware.js";
import AuthMiddleware from "./middleware/auth.middleware.js";
import authRouter from "./routes/auth.route.js";
import contactRouter from "./routes/contact.route.js";
import addressRouter from "./routes/address.route.js";

await dbConnection();
console.log(`App is running in Timezone ${Intl.DateTimeFormat().resolvedOptions().timeZone}`)

const app = express();
const host = process.env["APP_HOST"] || "127.0.0.1"
const port = Number(process.env["APP_HOST"]) || 3000;

app.use(morgan("common"));
app.use(express.json())
app.use("/api/v1", authRouter);
app.use(AuthMiddleware);
app.use("/api/v1", contactRouter);
app.use("/api/v1", addressRouter);
app.use(errorMiddleware)

const server = app.listen(port, host, () => console.log(`Server is running on: http://${host}:${port}`));
process.on('SIGINT', () => {
  console.log("SIGINT signal received: closing HTTP server")

  server.close(() => {
    console.log("SIGTERM signal received: closing HTTP server")
    process.exit(0)
  });
});
