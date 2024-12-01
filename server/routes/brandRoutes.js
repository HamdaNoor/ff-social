import express from "express";
import Brand from "../models/brandModel.js";
import { uploadFiles } from "../middlewares/uploadMiddleware.js";
import { submitBrand } from "../controllers/brandController.js";

const router = express.Router();

router.post("/submit", uploadFiles, async (req, res) => {
  try {
    await submitBrand(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/pending", async (req, res) => {
  try {
    const pendingBrands = await Brand.find({ status: "Pending" });
    res.json(pendingBrands);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/approve", async (req, res) => {
  try {
    const { id, status, reason } = req.body;

    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { status, reason: reason || "" },
      { new: true }
    );

    res.json(updatedBrand);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const approvedBrands = await Brand.find({ status: "Approved" }); // Fetch only approved brands
    res.json(approvedBrands);
  } catch (error) {
    console.error("Error fetching approved brands:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Backend Route Example
router.get("/brands/:brandId/products", async (req, res) => {
  try {
    const { brandId } = req.params;
    const products = await Product.find({ brand: brandId }); // Assuming 'Product' is your model
    if (Array.isArray(products)) {
      res.json(products);
    } else {
      res.status(500).json({ message: "Unexpected format" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Add this route to your backend API

// Export the router as default
export default router;
