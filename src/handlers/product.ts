import prisma from "../db";

/*
	- only some errors handled, i.e server will continue
		on some errors
	- errors are caught in try / catch
	- next() in a handler will auto assume param is error

*/

// Get all
export const getProducts = async (req, res) => {
    
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
		include: {
			products: true, // relational join
		},
	});

	res.json({ data: user.products });
};

// Get one
export const getOneProduct = async (req, res) => {
	const product = await prisma.product.findFirst({
		where: {
			id: req.params.id,
			belongsToId: req.user.id,
		},
	});

	res.json({ data: product });
};

export const createProduct = async (req, res, next) => {
	try{
    const product = await prisma.product.create({
		data: {
			name: req.body.name,
			belongsToId: req.user.id,
		},
	});
    

	res.json({ data: product });
} catch ( err) {
    err.type = "create"
    next(err)
}
};

export const updateProduct = async (req, res) => {
	const updated = await prisma.product.update({
		where: {
			id: req.params.id,
			belongsToId: req.user.id,
		},
		data: {
			name: req.body.name,
		},
	});

	res.json({ data: updated });
};

export const deleteProduct = async (req, res) => {
	const deleted = await prisma.product.delete({
		where: {
			id: req.params.id,
			belongsToId: req.user.id,
		},
	});
	res.json({ data: deleted });
};
