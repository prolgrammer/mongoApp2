import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container, List, ListItem, IconButton, Select, MenuItem } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

function Products() {
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', sellerId: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [sortOrder, setSortOrder] = useState(""); // Состояние для сортировки

  useEffect(() => {
    fetchProducts();
    fetchSellers();
  }, [sortOrder]); // Добавляем sortOrder как зависимость

  const fetchProducts = () => {
    let url = 'http://localhost:8085/api/products';
    if (sortOrder) {
      url += `?sortBy=price&order=${sortOrder}`;
    }
    axios.get(url)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  };

  const fetchSellers = () => {
    axios.get('http://localhost:8085/api/users')
      .then(response => setSellers(response.data))
      .catch(error => console.error('Error fetching sellers:', error));
  };

  const handleAdd = () => {
    axios.post('http://localhost:8085/api/products', newProduct)
      .then(response => {
        setProducts([...products, response.data]);
        setNewProduct({ name: '', price: '', description: ''});
      })
      .catch(error => console.error('Error adding product:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8085/api/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  const handleEdit = (id) => {
    const productToEdit = products.find(product => product.id === id);
    setEditingProduct(productToEdit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleSave = () => {
    if (editingProduct) {
      axios.put(`http://localhost:8085/api/products/${editingProduct.id}`, editingProduct)
        .then(response => {
          setProducts(products.map(product =>
            product.id === editingProduct.id ? response.data : product
          ));
          setEditingProduct(null);
        })
        .catch(error => console.error('Error updating product:', error));
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handleResetSort = () => {
    setSortOrder(null);
  };

  return (
    <div style={{ maxWidth: '1200px', width: "500px", margin: '0 auto', padding: '16px' }}>
      <Typography variant="h4" gutterBottom>Список товаров</Typography>
      <div style={{ marginBottom: '16px' }}>
        <Select
          value= {sortOrder}
          onChange={(event) => handleSort(event.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="asc">По возрастанию</MenuItem>
          <MenuItem value="desc">По убыванию</MenuItem>
        </Select>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
     {products.map(product => (
        <li key={product.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        {editingProduct && editingProduct.id === product.id? (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <TextField
                fullWidth
                variant="outlined"
                name="name"
                value={editingProduct.name}
                onChange={handleChange}
                placeholder="Название"
                style={{ marginBottom: '8px' }}
            />
            <TextField
                fullWidth
                variant="outlined"
                name="price"
                value={editingProduct.price}
                onChange={handleChange}
                placeholder="Цена"
                style={{ marginBottom: '8px' }}
            />
            <TextField
                fullWidth
                variant="outlined"
                name="description"
                value={editingProduct.description}
                onChange={handleChange}
                placeholder="Описание"
                style={{ marginBottom: '8px' }}
            />
            <div>
                <Button variant="contained" onClick={handleSave}  style={{ background: 'linear-gradient(45deg, #4CAF50, #8BC34A)', marginRight: '8px' }}>Сохранить</Button>
                <Button variant="contained" onClick={handleCancel} style={{ background: 'linear-gradient(45deg, #4CAF50, #8BC34A)'}}>Отменить</Button>
            </div>
            </div>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography variant="body1" style={{ flexGrow: 1 }}>
                    {product.name} - {product.price} - {product.description} - {product.sellerId}
                </Typography>
                <IconButton onClick={() => handleEdit(product.id)} style={{ marginRight: '8px' }}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(product.id)}>
                    <DeleteIcon />
                </IconButton>
                </div>
            )}
            </li>
        ))}
        </ul>
      <div style={{ marginTop: '24px' }}>
        <Typography variant="h5" style={{marginBottom: "10px"}}>Добавить товар</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <TextField
            fullWidth
            variant="outlined"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            placeholder="Именование товара"
          />
          <TextField
            fullWidth
            variant="outlined"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            placeholder="Цена"
          />
          <TextField
            fullWidth
            variant="outlined"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            placeholder="Описание"
          />
          <Button variant="contained" onClick={handleAdd} style={{ background: 'linear-gradient(45deg, #4CAF50, #8BC34A)' }}>
            Добавить
          </Button>
        </div>
      </div>
    </div>
  );
  
};

export default Products;

