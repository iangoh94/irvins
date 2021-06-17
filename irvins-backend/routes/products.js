const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get single product by id
router.get('/:productId', async (req, res) => {
    console.log('req', req);
    try {
        const product = await Product.findOne({ id: req.params.productId });
        res.status(200).json(product);
    } catch (err) {
        res.json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    console.log('req', req);
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        tags: req.body.tags
    });

    try {
        // Disallow duplicate id
        const existingProduct = await Product.findOne({ id: req.body.id });
        
        if (existingProduct) {
            throw new Error('Existing Product');
        }

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Update product
router.patch('/:productId', async (req, res) => {
    console.log('req', req.body);

    try {
        const updatedProduct = await Product.updateOne(
            { id: req.params.productId },
            {
                $set: {
                    id: req.body.id,
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    image: req.body.image,
                    tags: req.body.tags      
                }
            }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Delete product
router.delete('/:productId', async (req, res) => {
    try {
        const removedProduct = await Product.deleteOne({ id: req.params.productId });
        res.status(200).json(removedProduct);
    } catch (err) {
        res.json({ message: err.message});
    }
});

module.exports = router;