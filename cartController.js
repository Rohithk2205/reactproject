const Product = require('../models/product'); // Import the Product model
const { connectToDatabase } = require('../config/db');

const dataBase = "Toystore";
const productsCollectionName = "Products"; // Changed from "users" to "products" for clarity

// Cart function to add items
async function cart(req, res) {
    const client = await connectToDatabase();
    
    try {
        const { imageUrl, id, name, discountedPrice, originalPrice, quantity } = req.body;

        const collection = client.db(dataBase).collection(productsCollectionName);
        const productInDb = await collection.findOne({ id: id });

        if (productInDb) {
            // If product exists, update the quantity
            productInDb.quantity += quantity;
            await collection.updateOne({ id: id }, { $set: { quantity: productInDb.quantity } });
            res.status(200).json({ message: "Product quantity updated successfully", product: productInDb });
        } else {
            // If product does not exist, create a new product entry
            const newProduct = new Product({
                name,
                id,
                imageUrl,
                discountedPrice,
                originalPrice,
                quantity
            });
            const result = await collection.insertOne(newProduct);

            if (result.insertedId) {
                res.status(201).json({ message: "Product added to cart successfully", product: newProduct });
            } else {
                res.status(501).json({ message: "Failed to add product to cart" });
            }
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ message: "Failed to add product to cart" });
    } finally {
        client.close();
        console.log("Disconnected from database");
    }
}

async function getProductById(req, res) {
    const client = await connectToDatabase();

    try {
        const { id } = req.params;
        const collection = client.db(dataBase).collection(productsCollectionName);
        
        // Fetch the product by ID
        const product = await collection.findOne({ id: id });

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ message: "Failed to retrieve product" });
    } finally {
        client.close();
        console.log("Disconnected from database");
    }
}
async function deleteById(req, res) {
    const client = await connectToDatabase();

    try {
        console.log("0asdf")
        const { id } = req.params;
        const collection = client.db(dataBase).collection(productsCollectionName);
        
        
        const product = await collection.deleteOne({id:parseInt(id)})

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ message: "Failed to retrieve product" });
    } finally {
        client.close();
        console.log("Disconnected from database");
    }
}

async function getAllProducts(req, res) {
    const client = await connectToDatabase();

    try {
        const collection = client.db(dataBase).collection(productsCollectionName);
        const productsCursor = await collection.find(); // Get the cursor

        // Convert cursor to an array
        const products = await productsCursor.toArray();

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Failed to retrieve products" });
    } finally {
        client.close();
        console.log("Disconnected from database");
    }
}

module.exports = { cart, getProductById, getAllProducts,deleteById };
