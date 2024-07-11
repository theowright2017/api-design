import { Router } from "express";
import { body, oneOf, param } from "express-validator";
import { handleInputValidate } from "./modules/middleware";
import prisma from "./db";
import { isInt16Array } from "util/types";
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "./handlers/product";
import { create } from "domain";
import { createUpdate, deleteUpdate, getAllUpdates, getOneUpdate, updateUpdate } from "./handlers/update";

// body(property) - enforce re.body has value for specific property

const router = Router();

/**
 * Product
 * - log in with "secret" - get JWT token and input in bearer to get product
 */
router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.post("/product", body("name").isString(), createProduct);

router.put("/product/:id", body("name").isString(), handleInputValidate, updateProduct);

router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", getAllUpdates);

router.get("/update/:id", getOneUpdate);

/**
 * 	- define strict schema of what request body needs to succeed
 * 	- handler needs to ensure it accounts for these
 */
router.post(
	"/update",
	body("title").exists().isString(),
	body("body").exists().isString(),
  body("productId").exists().isString(),
	body("status").isIn(["IN_PROGRESS", "SHIPPING", "DEPRACATED"]),
	body("version").optional(),
	createUpdate
);

router.put(
	"/update/:id",
	body("title").exists().isString(),
	body("body").exists().isString(),
	updateUpdate
);

router.delete(
	"/update/:id",

	deleteUpdate
);

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => {});

router.get(
	"/updatepoint/:id",

	(req, res) => {}
);

router.post(
	"/updatepoint",
	body("name").exists().isString(),
	body("description").exists().isString(),
	body("updateId").exists().isString(),
	(req, res) => {}
);

router.put(
	"/updatepoint/:id",
	body("name").exists().isString(),
	body("description").optional().isString(),
	(req, res) => {}
);

router.delete("/updatepoint/:id", (req, res) => {});

export default router;
