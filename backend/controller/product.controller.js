// const  pool = require('../database/pg.databse') // Disabled for demo
//create product 
exports.createProduct = async (req, res) => {
    try {
        const {productName, productDesc, productPrice, categoryID, stock} = req.body;
        const sellerID = req.user.id;
        if(!productName || !productDesc || !productPrice || !categoryID || !stock || !sellerID){
            return res.status(400).json({
                success:false,
                message:"Fill all the details"
            })
        }

        const query = "INSERT INTO products(seller_id, product_name, price, product_description, stock, category_id) VALUES ($1, $2, $3, $4, $5, $6)"
        const values = [sellerID, productName, productPrice, productDesc, stock, categoryID];
        const product = await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"Product created",
            product: product.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in creating product",
            error
        })
    }
}

//get all products (required for assignment)
exports.getAllProducts = async (req, res) => {
    try {
        // For demo purposes, return mock products with Unsplash images
        const mockProducts = [
            { 
                id: 1, 
                name: "Laptop", 
                price: 999.99, 
                description: "High-performance laptop for work and gaming",
                image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop"
            },
            { 
                id: 2, 
                name: "Smartphone", 
                price: 699.99, 
                description: "Latest smartphone with advanced features",
                image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop"
            },
            { 
                id: 3, 
                name: "Headphones", 
                price: 199.99, 
                description: "Premium wireless noise-canceling headphones",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
            },
            { 
                id: 4, 
                name: "Tablet", 
                price: 399.99, 
                description: "Versatile tablet for productivity and entertainment",
                image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop"
            },
            { 
                id: 5, 
                name: "Smartwatch", 
                price: 299.99, 
                description: "Advanced smartwatch with health monitoring",
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
            },
            { 
                id: 6, 
                name: "Camera", 
                price: 1299.99, 
                description: "Professional DSLR camera with high resolution",
                image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop"
            },
            { 
                id: 7, 
                name: "Gaming Mouse", 
                price: 79.99, 
                description: "Precision gaming mouse with RGB lighting",
                image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop"
            },
            { 
                id: 8, 
                name: "Keyboard", 
                price: 149.99, 
                description: "Mechanical gaming keyboard with backlight",
                image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop"
            }
        ];

        return res.status(200).json({
            success: true,
            products: mockProducts
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in getting all products",
            error
        });
    }
}

//get all product from category ID (existing functionality)
exports.getAllProduct = async (req, res) => {
    try {
        const categoryID = req.params.id;
        if(!categoryID){
            return res.status.json({
                success:false,
                message:"Category ID not Found"
            })
        }

        const query = "SELECT * FROM products WHERE category_id = $1";
        const values = [categoryID];
        const products = await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"ALL products of same category",
            products:products.rows
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in get all the products from category ID",
            error
        })
    }
}

//get all details of product by Id
exports.getDetailsOfProduct = async (req, res) => {
    try {
        const productID = req.params.id;
        if(!productID){
            return res.status(400).json({
                success:false,
                message:"Product ID not found"
            })
        }

        const query = "SELECT * FROM products WHERE product_id = $1"
        const values = [productID];

        const product = await pool.query(query, values)

        return res.status(200).json({
            success:true,
            message:"All details of product",
            product:product.rows
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in geting details of product",
            error
        })
    }
}

//updating stock of product 
exports.updatingProduct = async (req, res) => {
    try {
        const productID = req.params.id;
        const {stock} = req.body;
        if(!stock || !productID){
            return res.status(400).json({
                success:false,
                message:"Details not found"
            })
        }

        const query = "UPDATE products SET stock = $1 WHERE product_id = $2";
        const values = [stock, productID];
        const updatedProduct = await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"Product details updated",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in updating product",
            error
        })
    }
}

//delete a product from ID
exports.deleteProduct = async (req, res) => {
    try {
        const productID = req.params.id;
        if(!productID){
            return res.status(400).json({
                success:false,
                message:"Product Id not found"
            })
        }

        const query = "DELETE FROM products WHERE product_id = $1";
        const values = [productID];
        await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in deleting product",
            error
        })
    }
}