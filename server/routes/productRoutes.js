import express from "express";
import {
  addProduct,
  getProducts,
  bulkUploadProducts,
  getProductsByBrand,
  updateProduct,
  deleteProduct,
  getShirts,
  getPents,
  getStiched,
  getFootwear,
  getUnstiched // Import the getShirts controller
} from "../controllers/productController.js";
import { uploadFiles, uploadFile } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Route to add a new product
router.post("/", uploadFiles, addProduct);

// Route to get all products with optional filters
router.get("/", getProducts);

// Route to get all shirts across all brands
router.get("/shirts", getShirts); // New route for fetching shirts
router.get("/pents", getPents); // New route for fetching shirts
router.get("/stiched", getStiched); // New route for fetching shirts
router.get("/unstiched", getUnstiched); // New route for fetching Unstitched products
router.get("/footwear", getFootwear);  // New route for fetching Footwear products


// Route to get products by brand
router.get("/:brandId/products", getProductsByBrand);

// Route to update a product by ID
router.put("/:productId", uploadFiles, updateProduct);

// Route to delete a product by ID
router.delete("/:productId", deleteProduct);

// Route for bulk upload of products
router.post("/upload", uploadFile, async (req, res, next) => {
  try {
    if (req.file) {
      console.log("Received file:", req.file.originalname);
    } else {
      return res.status(400).json({ message: "No file uploaded." });
    }

    await bulkUploadProducts(req, res);
  } catch (error) {
    console.error("Error handling bulk upload:", error);
    next(error);
  }
});

export const productRoutes = router;
