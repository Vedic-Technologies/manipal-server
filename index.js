console.clear();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const swaggerJSDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const { checkForAuthentication } = require("./middlewares/auth.js");
const healthCheck = require("./service/health.js");
const userRouter = require("./routes/user");
const SuperAdminRouter = require("./routes/superAdmin.js");
const staffRouter = require("./routes/staff.js");
const patientRouter = require("./routes/patient.js");
const doctorRouter = require("./routes/doctor.js");
const paymentRouter = require("./routes/payment.js");

// const adminRouter = require("./routes/admin");
const { connectMongoDb } = require("./connection.js");
const cookieParser = require("cookie-parser");
// const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const PORT = process.env.PORT;
const URI = process.env.URI;

const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://manipal-client.vercel.app", // Production URL
];

const corsOptions = {
  // origin: "http://localhost:3000",
  // origin: "https://manipal-client.vercel.app",
  origin: (origin, callback) => {
    // console.log(origin);
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));

// Connection
connectMongoDb(URI);

// MIDDLEWARE - plugin
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload({ useTempFiles: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
// app.use(logReqRes("log.txt"))

const swaggerDocs = YAML.load("./api.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//ROUTES

app.use("/api/users", userRouter);
app.use("/api/superAdmin", SuperAdminRouter);
app.use("/api/staffs", checkForAuthentication, staffRouter);
app.use("/api/patient", checkForAuthentication, patientRouter);
// app.use("/patient", checkForAuthentication, patientRouter);
app.use("/api/doctors", checkForAuthentication, doctorRouter);
app.use("/api/payment", checkForAuthentication, paymentRouter);


app.use("/health", healthCheck);

// app.use("/api/admin", adminRouter);

app.listen(PORT, () => console.log(`server started at ${PORT}`));
