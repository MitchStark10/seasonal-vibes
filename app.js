import cookieParser from "cookie-parser";
import express from "express";
import path from "path";
import { __dirname } from "./lib/utils/dirname.js";
import authRoutes from "./routes/auth/index.js";
import indexRouter from "./routes/index.js";
import settingsRouter from "./routes/settings/index.js";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRoutes);
app.use("/settings", settingsRouter);
app.use("/", indexRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
