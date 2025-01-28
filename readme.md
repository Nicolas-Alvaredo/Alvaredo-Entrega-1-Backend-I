# 1er Entrega Backend I - Gestión de Productos y Carritos

Este proyecto es una API desarrollada en **Node.js** y **Express** que permite gestionar productos y carritos de compras mediante diferentes endpoints.

## 🚀 Características principales

### Productos

- **Crear productos**: Se pueden agregar productos con los siguientes campos:
  - `title`, `description`, `price`, `thumbnails`, `code`, `stock`, `category`, `status`.
- **Obtener productos**: Listar todos los productos o buscar por ID.
- **Actualizar productos**: Actualizar cualquier campo excepto el `id`.
- **Eliminar productos**: Eliminar un producto existente.

### Carritos

- **Crear carritos**: Generar un carrito vacío con un `cid` único.
- **Obtener carritos**: Consultar un carrito por su `cid` y listar los productos que contiene.
- **Agregar productos**: Añadir productos al carrito. Si el producto ya existe, incrementa la cantidad (`quantity`).
- **Eliminar carritos**: Eliminar un carrito específico.

### Persistencia de datos

Los datos de productos y carritos se almacenan en archivos JSON (`products.json` y `carts.json`) utilizando el sistema de archivos de Node.js (**fs**).

## 🛠️ Instalación y ejecución

```bash
   npm install
```

## 🛠️ Ejecución

```bash
   npm start
```
