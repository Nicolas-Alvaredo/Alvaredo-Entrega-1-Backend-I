const express = require('express');
const CartManager = require('../managers/cartManager');

const router = express.Router();
const cartManager = new CartManager();

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un carrito por ID
router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid);
        res.status(200).json(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Agregar un producto al carrito (incrementando cantidad en 1 cada vez)
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        
        const updatedCart = await cartManager.addProductToCart(cid, pid);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Eliminar un carrito por ID
router.delete('/:cid', async (req, res) => {
  try {
      const { cid } = req.params;
      const response = await cartManager.deleteCart(cid);
      res.status(200).json(response);
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
});

module.exports = router;
