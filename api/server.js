import express from "express";
import uploadRoute from "./src/routes/upload.js";
import { connectToRabbitMQ } from "./src/utils/rabbitmq.js";

const port = 4003;
const app = express();

connectToRabbitMQ();

app.use(express.json());
app.use("/upload", uploadRoute);
console.log(`running server on port ${port} ...`);
app.listen(port);
