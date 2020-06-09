require("express-async-errors");
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const path = require("path");

const fileRoutes = require("./routes/files");
const errorMiddleware = require("./middleware/error");
const initDB = require("./config/db");

require("events").EventEmitter.prototype._maxListeners = 100;
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "./uploads/")));

//Api routes
app.use("/api/v1/files", fileRoutes);

//Handle invalid api endpoints
app.use((req, res, next) => {
  throw new CustomError("Invalid request", 400);
});

// Handle server erros
app.use(errorMiddleware);

app.use("/api/v1/files", fileRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => `Server now running on ${port}`);
