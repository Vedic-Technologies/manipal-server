const express = require("express");
const app = express();
const swaggerJSDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const { restrictToLoggedin } = require("./middlewares/auth.js");
const userRouter = require("./routes/user");
const patientRouter = require("./routes/patient.js");
const paymentRouter = require("./routes/payment.js");

// const adminRouter = require("./routes/admin");
const { connectMongoDb } = require("./connection.js");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const PORT = process.env.PORT;
const URI = process.env.URI;
app.use(cors());

// Connection
connectMongoDb(URI);

// MIDDLEWARE - plugin
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
// app.use(logReqRes("log.txt"))

const swaggerDocs = YAML.load("./api.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//ROUTES
app.use("/api/users", userRouter);
app.use("/api/patient", patientRouter);
app.use("/api/payment", paymentRouter);

// app.use("/api/admin", adminRouter);

app.listen(PORT, () => console.log(`server started at ${PORT}`));
