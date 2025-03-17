require("dotenv").config();
const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const app = express();
const mongoose = require("mongoose");
const { logEvents } = require("./middleware/logger");

const PORT = process.env.PORT || 3000;

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));


app.all("*", (req, res) => {
	console.log(req.url);
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "views", "404.html"));
	} else if (req.accepts("json")) {
		res.json({ message: "404 not found." });
	} else {
		res.type("txt", send("404 not found"));
	}
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
	app.listen(PORT, () => {
		process.stdout.write("\x1Bc");
		console.log(`Server running on port ${PORT}...`);
	});
});

mongoose.connection.on('error', (err) => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrorLog.log')
})
