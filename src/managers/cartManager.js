const fs = require('fs').promises;
const path = require('path');

// Definir la ruta del archivo JSON para carritos
const cartsFilePath = path.join(__dirname, '../data/carts.json');

class CartManager {
    constructor() {
        this.path = cartsFilePath;
        this.initFile();
    }

    // Inicializar el archivo si no existe
    async initFile() {
        try {
            await fs.access(this.path);
        } catch (error) {
            await this.saveToFile([]);
        }
    }

    // Leer carritos desde el archivo
    async getAllCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            throw new Error(`Error al leer carritos: ${error.message}`);
        }
    }

    // Guardar carritos en el archivo
    async saveToFile(data) {
        try {
            await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            throw new Error(`Error al guardar carritos: ${error.message}`);
        }
    }

    // Obtener un carrito por ID
    async getCartById(cid) {
        try {
            console.log(`Buscando carrito con ID: ${cid}`);
            const carts = await this.getAllCarts();
            console.log('Carritos cargados:', carts);

            const cart = carts.find(c => c.id.toString() === cid.toString());
            if (!cart) {
                throw new Error(`No se encontró el carrito con ID: ${cid}`);
            }
            return cart;
        } catch (error) {
            throw new Error(`Error al obtener carrito: ${error.message}`);
        }
    }

    // Crear un nuevo carrito con ID autogenerado
    async createCart() {
        try {
            const carts = await this.getAllCarts();
            const newCart = { id: Date.now().toString(), products: [] };

            carts.push(newCart);
            await this.saveToFile(carts);

            return newCart;
        } catch (error) {
            throw new Error(`Error al crear carrito: ${error.message}`);
        }
    }

    // Agregar un producto al carrito
    async addProductToCart(cid, pid, quantity) {
      try {
          const carts = await this.getAllCarts();
          const cartIndex = carts.findIndex(c => c.id.toString() === cid.toString());
  
          if (cartIndex === -1) {
              throw new Error(`No se encontró el carrito con ID: ${cid}`);
          }
  
          const cart = carts[cartIndex];
  
          // Validar si el producto ya existe en el carrito
          const productIndex = cart.products.findIndex(p => p.product.toString() === pid.toString());
  
          if (productIndex !== -1) {
              cart.products[productIndex].quantity += quantity; // Sumar la cantidad enviada en el body
          } else {
              cart.products.push({ product: pid.toString(), quantity }); // Añadir la cantidad del body
          }
  
          await this.saveToFile(carts);
          return cart;
      } catch (error) {
          throw new Error(`Error al agregar producto al carrito: ${error.message}`);
      }
  }
  

    // Eliminar un carrito por ID
    async deleteCart(cid) {
        try {
            const carts = await this.getAllCarts();
            const newCarts = carts.filter(c => c.id.toString() !== cid.toString());

            if (carts.length === newCarts.length) {
                throw new Error(`No se encontró el carrito con ID: ${cid}`);
            }

            await this.saveToFile(newCarts);
            return { message: `Carrito con ID ${cid} eliminado.` };
        } catch (error) {
            throw new Error(`Error al eliminar carrito: ${error.message}`);
        }
    }
}

module.exports = CartManager;
