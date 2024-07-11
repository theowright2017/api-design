import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";

const app = express();

/* ---  extract to Middleware file? --- */

app.use(cors());

/**
 * global mount for all calls
 * (morgan logs all calls)
 */
app.use(morgan("dev"));

/**
 *  middleware
 *      - allows client to send us json
 */
app.use(express.json());

/**
 *  allows url decoding
 *  (turns params into object)
 */
app.use(express.urlencoded({ extended: true }));

/**
 * More middleware
 */
app.use((req, res, next) => {
	// res.status(400)
	// res.send('Nope')

	next();
});

/* ---  end of Middleware --- */

app.get("/", (req, res, next) => {
	res.json({message: 'hello'})
});

/**
 * mount to methods in ./router
 *  /api becomes prefix for all router methods
 */
app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signIn);

/**
 * error handling channeled to here to serve
 * 	status codes and response
 * - any try / catch in handler, next(err) lands here
 */
app.use((err, req, res, next) => {
	console.log("err::", err);

	if (err.type === "auth") {
		res.status(401).json({ message: "unuath" });
	} else if (err.type === "input") {
		res.status(400).json({ message: "input" });
	} else if (err.type === "create") {
		res.status(500).json({ message: "error on create" });
	} else {
		res.status(500).json({ message: "our erro" });
	}
	res.json({ message: "ERROR!!" });
});

export default app;
