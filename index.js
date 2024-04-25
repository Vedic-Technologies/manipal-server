const express = require("express");
const app = express();
const swaggerJSDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const { restrictToLoggedin } = require("./middlewares/auth.js");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const { connectMongoDb } = require("./connection.js");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const { version } = require("mongoose");
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

const option = {
  definition: {
    openai: "3.0.0",
    info: {
      title: "Node Js API Project for physiotherapy",
      version: "1.0.0",
    },
    servers: [
      {
        api: "https://localhost:8000/",
      },
    ],
  },
  apis: ["./index.js", "./routes/admin.js"],
};

const swaggerDocs = swaggerJSDocs(option);
console.log(swaggerDocs);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/users/:
 *   get:
 *     description: Returns a list of all users.
 *     responses:
 *       200:
 *         description: Successful response
 *         examples:
 *           application/json:
 *             users:
 *               - id: 1
 *                 name: John Doe
 *                 email: john@example.com
 *                 role: user
 *               - id: 2
 *                 name: Jane Smith
 *                 email: jane@example.com
 *                 role: admin
 */

//ROUTES
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => console.log(`server started at ${PORT}`));
