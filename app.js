// --------------------- Import Required Modules ---------------------

require("dotenv").config();

const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
// const csrf = require("csurf");
const OS = require("os");

const morgan = require("morgan");

// Create Server

const app = express();

// --------------------- Import Server and Database Configuration ---------------------

const { PORT, origin, NODE_ENV } = require("./settings/settings");

// --------------------- Set Global Middlware ---------------------

// Parsing Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging Middlware

app.use(morgan("dev"));

// Global Security Middleware

app.use(helmet());

if (NODE_ENV === "production") {
  // Enable TLS/SSL Proxy Configuration

  app.enable("trust proxy");
}

// Set Response Headers

app.use(async (req, res, next) => {
  try {
    await res.header("Access-Control-Allow-Origin", origin);
    await res.header("Access-Control-Allow-Credentials", true);
    return await next();
  } catch (error) {
    const response = {
      message: "Could not set response headers.",
      error,
    };
    console.error(response);
    return res.status(500).json(response);
  }
});

// CORS Pre-Flight

app.options(
  "*",
  cors({
    origin,
    method: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
    allowedHeaders: [
      "_sid",
      "_csrf",
      "x-csrf-token",
      "X-Auth-Token",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Methods",
      "X-Requested-With",
      "X-forwarded-proto",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

// --------------------- Set Router Middleware ---------------------

// Import API Routes

const profileUpload = require("./routes/profile/upload");

app.use("/profile/upload", profileUpload);

app.get("/", (req, res) => {
  return res.json({ message: "Success" });
});

// --------------------- Start Server ---------------------

if (!PORT) {
  throw new Error("Port not set.");
} else {
  app.listen(PORT, () => {
    if (NODE_ENV === "development") {
      return console.log("Environment: Development.");
    } else if (NODE_ENV === "production") {
      return console.log("Environment: Production.");
    } else if (!NODE_ENV) {
      throw new Error("Environment not set.");
    } else {
      throw new Error("Environment invalid.");
    }
  });

  console.log(`Server started on port: ${PORT}.`);
}

if (NODE_ENV === "development") {
  console.log(`CPU count: ${OS.cpus().length}.`);
}
