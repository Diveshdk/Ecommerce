// Mock in-memory cart for demo purposes (in production, use database)
let cart = [];
let cartIdCounter = 1;

// POST /api/cart - Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, qty } = req.body;
        
        if (!productId || !qty) {
            return res.status(400).json({
                success: false,
                message: "Product ID and quantity are required"
            });
        }

        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(item => item.productId === productId);
        
        if (existingItemIndex !== -1) {
            // Update quantity if item exists
            cart[existingItemIndex].qty += qty;
        } else {
            // Add new item to cart
            const newItem = {
                id: cartIdCounter++,
                productId,
                qty
            };
            cart.push(newItem);
        }

        return res.status(200).json({
            success: true,
            message: "Item added to cart",
            cart
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error adding item to cart",
            error: error.message
        });
    }
};

// DELETE /api/cart/:id - Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const itemId = parseInt(req.params.id);
        
        const itemIndex = cart.findIndex(item => item.id === itemId);
        
        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            });
        }

        cart.splice(itemIndex, 1);

        return res.status(200).json({
            success: true,
            message: "Item removed from cart",
            cart
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error removing item from cart",
            error: error.message
        });
    }
};

// GET /api/cart - Get cart items and total
exports.getCart = async (req, res) => {
    try {
        // Mock product prices for calculation
        const productPrices = {
            1: 999.99,
            2: 699.99,
            3: 199.99,
            4: 399.99,
            5: 299.99,
            6: 1299.99,
            7: 79.99,
            8: 149.99
        };

        const cartWithDetails = cart.map(item => ({
            ...item,
            price: productPrices[item.productId] || 0,
            subtotal: (productPrices[item.productId] || 0) * item.qty
        }));

        const total = cartWithDetails.reduce((sum, item) => sum + item.subtotal, 0);

        return res.status(200).json({
            success: true,
            cart: cartWithDetails,
            total: total.toFixed(2)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting cart",
            error: error.message
        });
    }
};

// POST /api/checkout - Process checkout
exports.checkout = async (req, res) => {
    try {
        const { cartItems } = req.body;
        
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        // Calculate total
        const productPrices = {
            1: 999.99,
            2: 699.99,
            3: 199.99,
            4: 399.99,
            5: 299.99,
            6: 1299.99,
            7: 79.99,
            8: 149.99
        };

        const total = cartItems.reduce((sum, item) => {
            const price = productPrices[item.productId] || 0;
            return sum + (price * item.qty);
        }, 0);

        // Mock receipt
        const receipt = {
            id: Date.now(),
            items: cartItems,
            total: total.toFixed(2),
            timestamp: new Date().toISOString(),
            status: "completed"
        };

        // Clear cart after checkout
        cart = [];
        cartIdCounter = 1;

        return res.status(200).json({
            success: true,
            message: "Checkout completed",
            receipt
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error processing checkout",
            error: error.message
        });
    }
};