import express from "express";
import { promises as fs } from "fs";
import winston from "winston";
import gradesRouter from "./routes/grades.js";
import cors from "cors";
import swagger from "swagger-ui-express";
import { swaggerDocument } from "./document.js";

const { readFile, writeFile } = fs;

global.fileName = "grades.json";

const { combine, timestamp, label, printf, level, message } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
})

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: "grade-control-api.log" })
  ],
  format: combine(
    label({ label: "grade-control-api" }),
    timestamp(),
    myFormat
  )
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/document", swagger.serve, swagger.setup(swaggerDocument));
app.use("/grade", gradesRouter);


app.listen(3000, async () => {
  try {
    await readFile("grades.json");
  } catch (error) {
    const initialJson = {
      nextId: 48,
      grades: []
    }

    writeFile("grades.json", JSON.stringify(initialJson)).then(() => {
      console.log("API started");
    }).catch(error => {
      console.log(error);
    })
  }
});