require("dotenv").config();
const express = require("express");
const personApiRouter = require("./routes/api/person.routes.js");
const infoRouter = require("./routes/info.route.js");
const { corsMiddleware } = require("./middeware/cors.middleware");
const { morganMiddeware } = require("./middeware/morgan.middleware");
const { connectMongo } = require("./db/mongo.db.js");
const {
  errorHandler,
  unknownEndpoint,
  mongoError,
} = require("./middeware/errorHandler.middleware.js");

connectMongo();

const app = express();

// Middlewares
app.use(express.json());
app.use(corsMiddleware);
app.use(express.static("./dist/"));
app.use(morganMiddeware);

//Routes
app.use("/api", personApiRouter);
app.use("/info", infoRouter);

//Error Handlers
app.use(unknownEndpoint);
app.use(mongoError);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));
