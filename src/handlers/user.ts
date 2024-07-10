import prisma from "../db";
import { hashPassword, createJWT, comparePasswords } from "../modules/auth";

export const createNewUser = async (req, res) => {
    const existingUser = await prisma.user.findUnique({
		where: {
			username: req.body.username,
		},
	});

    if (existingUser) {
        res.status(400)
        res.send('username not available')
        return
    }


	const user = await prisma.user.create({
		data: {
			username: req.body.username,
			password: await hashPassword(req.body.password),
		},
	});

	const token = createJWT(user);
	res.json({ token });
};

export const signIn = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			username: req.body.username,
		},
	});
    
	const matchesPassword = await comparePasswords(
		req.body.password,
		user.password
	);

	if (!matchesPassword) {
		res.status(401);
		res.send("invalid password");
		return;
	}

	const token = createJWT(user);
	res.json({ token });
};
