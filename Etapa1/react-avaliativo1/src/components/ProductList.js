import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Notebook', price: 2500.00 },
    { id: 2, name: 'Smartphone', price: 1500.00 },
    { id: 3, name: 'Tablet', price: 1200.00 },
  ]);

  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  const handleAddToCart = (product) => {
    alert(`Produto ${product.name} adicionado ao carrinho!`);
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProducts([...products, {
        id: products.length + 1,
        name: newProduct.name,
        price: parseFloat(newProduct.price)
      }]);
      setNewProduct({ name: '', price: '' });
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <div>
        <input
          type="text"
          placeholder="Nome do produto"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Preço"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button onClick={handleAddProduct}>Adicionar Produto</button>
      </div>
      <div>
        {products.map(product => (
          <div key={product.id}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
            <button onClick={() => handleDeleteProduct(product.id)}>Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;