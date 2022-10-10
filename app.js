import express from "express";
import path from "path";
import cookieparser from "cookie-parser";
import createError from "http-errors";
import logger from "morgan";
import dotenv from "dotenv";

dotenv.config();

import globalRouter from "./router/globalRouter";
import { home } from "./routes";

// auto reload modules..
import { createServer } from "livereload";
import connectLiveReload from "connect-livereload";
const refreshTimeInterval = 100;
const liveReloadServer = createServer();
const liveServer = liveReloadServer.server;

liveServer.once("connection", () => {
	setTimeout(() => {
		liveReloadServer.refresh(home);
	}, refreshTimeInterval);

	console.log("brower is reloaed just before...");
});

var app = express();
app.use(connectLiveReload());

// set view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// middlewares...
app.use(logger("dev")); // HTTP request logger.
app.use(cookieparser());

// built-in middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use(home, globalRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handling...
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === process.env.NODE_ENV ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

export default app;
