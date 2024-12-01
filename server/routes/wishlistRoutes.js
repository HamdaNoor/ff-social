// routes/wishlistRoutes.js
import express from 'express';
import { addToWishlist, removeFromWishlist } from '../controllers/wishlistController.js'; // Import the controllers

const router = express.Router();

// Route to add a product to the wishlist
router.post('/add', addToWishlist);

// Route to remove a product from the wishlist
router.post('/remove', removeFromWishlist);

export default router;
