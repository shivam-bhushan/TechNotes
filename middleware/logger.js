const { format } = require("date-fns");
const { v4: uuid } = require("uuid"); // v4 means that the uuid will be absolutely random and there is less chance of collisions
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

require("dotenv").config();

const logEvents = async (message, logFileName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
    console.log(`${req.method} ${req.path}`);
  }
  next();
};

module.exports = { logEvents, logger };
