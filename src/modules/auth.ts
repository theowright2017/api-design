import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

export const comparePasswords = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5)
}

export const createJWT = (user) => {
	const token = jwt.sign(
		{ id: user.id, username: user.username },
		process.env.JWT_SECRET
	);

	return token;
};

export const protect = (req, res, next) => {
	const bearer = req.headers.authorization;

	/**
	 * if no bearer, no auth
	 */
	if (!bearer) {
		res.status(401);
		res.send("Error - no Bearer !");
		return;
	}

	const [, token] = bearer.split(" ");

	if (!token) {
		res.status(401);
		res.send("not valid token");
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		req.user = user;
		next();
	} catch (error) {
		res.status(401);
		res.send("incorrect user");
        return
	}
};
