import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Box 
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import axios from 'axios';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [newOrder, setNewOrder] = useState({ buyerName: '', buyerEmail: '', selectedProducts: [] });
    const [editingOrder, setEditingOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      fetchOrders();
      fetchProducts();
    }, []);
  
    const fetchOrders = () => {
      axios.get('http://localhost:8085/api/orders')
        .then(response => setOrders(response.data))
        .catch(error => console.error('Error fetching orders:', error));
    };
  
    const fetchProducts = () => {
      axios.get('http://localhost:8085/api/products')
        .then(response => setProducts(response.data))
        .catch(error => console.error('Error fetching products:', error));
    };
  
    const handleAdd = () => {
        // Ensure the newOrder object is correctly structured according to the backend expectations
        const preparedData = {
          buyerName: newOrder.buyerName,
          buyerEmail: newOrder.buyerEmail,
          selectedProducts: newOrder.selectedProducts.map(productId => ({ productId })) // Assuming the backend expects an array of objects with productId
        };
      
        axios.post('http://localhost:8085/api/orders', preparedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
       .then(response => {
           setOrders([...orders, response.data]);
           setNewOrder({ buyerName: '', buyerEmail: '', selectedProducts: [] });
         })
        .catch(error => console.error('Error adding order:', error));
      };
      
  
    const handleDelete = (id) => {
      axios.delete(`http://localhost:8085/api/orders/${id}`)
        .then(response => {
          setOrders(orders.filter(order => order.id !== id));
        })
        .catch(error => console.error('Error deleting order:', error));
    };
  
    const handleEdit = (id) => {
      const existingOrderIndex = orders.findIndex(order => order.id === id);
      if (existingOrderIndex!== -1) {
        setEditingOrder(orders[existingOrderIndex]);
      } else {
        console.error('Order with ID', id, 'not found');
      }
    };
    
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (editingOrder) {
        setEditingOrder({ ...editingOrder, [name]: value });
      } else {
        setNewOrder({ ...newOrder, [name]: value });
      }
    };
  
    const handleProductSelect = (e) => {
      const { value } = e.target;
      console.log(e.target);
      console.log(products)
      console.log(products.find(product => product.id === e.target));
      if (editingOrder) {
        setEditingOrder({ ...editingOrder, selectedProducts: value });
      } else {
        setNewOrder({ ...newOrder, selectedProducts: value });
      }
    };
    
  
    const handleSave = () => {
      if (editingOrder) {
        axios.put(`http://localhost:8085/api/orders/${editingOrder.id}`, editingOrder)
          .then(response => {
            setOrders(orders.map(order =>
              order.id === editingOrder.id ? response.data : order
            ));
            setEditingOrder(null);
          })
          .catch(error => console.error('Error updating order:', error));
      }
    };
  
    const handleCancel = () => {
      setEditingOrder(null);
    };
  
    const handleSearch = () => {
      axios.get(`http://localhost:8085/api/orders/search?query=${searchQuery}`)
        .then(response => setOrders(response.data))
        .catch(error => console.error('Error searching orders:', error));
    };
  
    return (
      <Container className='content'>
          <div className='content'>
        <Typography variant="h4" gutterBottom>Заказы</Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField 
            label="Поиск" 
            variant="outlined" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginLeft: '16px', background: 'linear-gradient(45deg, #4CAF50, #8BC34A)' }}>
            Поиск
          </Button>
        </Box>
        <List>
          {orders.map(order => (
            <ListItem key={order.id} divider>
              {editingOrder && editingOrder.id === order.id ? (
                <Box width="100%">
                  <TextField 
                    label="Имя покупателя" 
                    name="buyerName" 
                    value={editingOrder.buyerName} 
                    onChange={handleChange} 
                    fullWidth 
                    margin="normal"
                  />
                  <TextField 
                    label="Почта" 
                    name="buyerEmail" 
                    value={editingOrder.buyerEmail} 
                    onChange={handleChange} 
                    fullWidth 
                    margin="normal"
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Товары</InputLabel>
                    <Select
                      name="Продукты"
                      multiple
                      value={editingOrder.selectedProducts}
                      onChange={handleProductSelect}
                    >             
                      {products.map(product => (
                        <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={handleSave} style={{ background: 'linear-gradient(45deg, #4CAF50, #8BC34A)', marginRight: '8px' }}>
                      Сохранить
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleCancel} style={{ background: 'linear-gradient(45deg, #4CAF50, #8BC34A)'}}>
                      Отменить
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box width="100%">
                  <ListItemText
                    primary={order.buyerName}
                    secondary={order.buyerEmail}
                  />
                  <List>
                    {order.selectedProducts && order.selectedProducts.map(product => (
                      <ListItem key={product.id}>
                        <ListItemText primary={product.name} />
                      </ListItem>
                    ))}
                  </List>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(order.id)}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(order.id)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </Box>
              )}
            </ListItem>
          ))}
        </List>
        <Box mt={4}>
          <Typography variant="h5">Добавить заказ</Typography>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <TextField 
              label="Имя покупателя" 
              name="buyerName" 
              value={newOrder.buyerName} 
              onChange={handleChange} 
              fullWidth 
              margin="normal"
            />
            <TextField 
              label="Почта" 
              name="buyerEmail" 
              value={newOrder.buyerEmail} 
              onChange={handleChange} 
              fullWidth 
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Продукты</InputLabel>
              <Select
                name="Товары"
                multiple
                value={newOrder.selectedProducts}
                onChange={handleProductSelect}
              >
                {products.map(product => (
                  <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={handleAdd} style={{ background: 'linear-gradient(45deg, #4CAF50, #8BC34A)', alignSelf: 'center' }}>
                Добавить
              </Button>
            </Box>
          </div>
        </Box>
        </div>
      </Container>
    );
  }

export default Orders;
