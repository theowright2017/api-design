import prisma from "../db";

/*
	- currently no errors handled in update
	- server will crash on error

*/


// Get all
export const getAllUpdates = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id,
		},
		include: {
			updates: true,
		},
	});

	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates];
	}, []);

	res.json({ data: updates });
};

// Get one
export const getOneUpdate = async (req, res) => {
	const update = await prisma.update.findUnique({
		where: {
			id: req.params.id,
		},
	});

	res.json({ data: update });
};

export const createUpdate = async (req, res) => {
	const product = await prisma.product.findFirst({
		where: {
			id: req.body.productId,
		},
	});

	const update = await prisma.update.create({
		data: req.body,
	});

	res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id,
		},
		include: {
			updates: true,
		},
	});

	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates];
	}, []);

	const match = updates.find((update) => update.id === req.params.id);

	if (!match) {
		// handle this
		return res.json({ message: "nope" });
	}

	const updatedUpdate = await prisma.update.update({
		where: {
			id: req.params.id,
		},
		data: req.body,
	});

	res.json({ data: updatedUpdate });
};

export const deleteUpdate = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id,
		},
		include: {
			updates: true,
		},
	});

	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates];
	}, []);

	const match = updates.find((update) => update.id === req.params.id);

	if (!match) {
		// handle this
		return res.json({ message: "nope" });
	}

	const deleted = await prisma.update.delete({
		where: {
			id: req.params.id,
		},
	});

	res.json({ data: deleted });
};
