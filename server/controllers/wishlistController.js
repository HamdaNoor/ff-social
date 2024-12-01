import Wishlist from '../models/Wishlist.js';
import Catalog from '../models/catalog.js';

// Add product to wishlist
export const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;  // Get userId directly from the request body

  try {
    // Get product details from Catalog
    const product = await Catalog.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the user's wishlist
    let wishlist = await Wishlist.findOne({ user: userId });

    if (wishlist) {
      // If the wishlist exists, check if the product is already in the wishlist
      const productIndex = wishlist.products.findIndex(item => item.product.toString() === productId);

      if (productIndex === -1) {
        // If the product is not in the wishlist, add it
        wishlist.products.push({ product: productId });
        await wishlist.save();
        return res.status(200).json(wishlist);
      } else {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }
    } else {
      // If the wishlist doesn't exist, create a new wishlist for the user
      wishlist = new Wishlist({
        user: userId,
        products: [{ product: productId }]
      });

      await wishlist.save();
      return res.status(200).json(wishlist);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product to wishlist' });
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;  // Get userId and productId directly from the body

  try {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    const productIndex = wishlist.products.findIndex(item => item.product.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in wishlist' });
    }

    wishlist.products.splice(productIndex, 1);  // Remove product from wishlist

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing product from wishlist' });
  }
};
