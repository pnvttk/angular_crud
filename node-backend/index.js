let express = require("express"),
  path = require("path"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  mongoDb = require("./database/db");

mongoose.Promise = global.Promise;
mongoose
  .connect(mongoDb.db, {
    /* From the Mongoose 6.0 useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options. Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false. Please remove these options from your code. */
    // userNewUrlParser: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database successfully connected");
    },
    (error) => {
      console.log("Database error: " + error);
    }
  );

const bookRoute = require("./routes/book.routes");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());

//Static directory path
app.use(express.static(path.join(__dirname, "dist/")));
// Base route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

// Api Root
app.use("/api", bookRoute);

// PORT
const port = process.env.port || 8000;

app.listen(port, () => {
  console.log("listening on port " + port);
});

// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
