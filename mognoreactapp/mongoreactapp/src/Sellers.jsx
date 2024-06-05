import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container, List, ListItem, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

function Sellers() {
  const [sellers, setSellers] = useState([]);
  const [newSeller, setNewSeller] = useState({ name: '', email: '', phone: '' });
  const [editingSeller, setEditingSeller] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSellers();
  }, [searchQuery]); // Добавили зависимость

  const fetchSellers = () => {
    let url = 'http://localhost:8085/api/users';
    if (searchQuery) {
      url += `?query=${searchQuery}`;
    }
    console.log('Fetching sellers with URL:', url); // Логируем URL
    axios.get(url)
      .then(response => {
        console.log('Response data:', response.data); // Логируем ответ
        setSellers(response.data);
      })
      .catch(error => console.error('Error fetching sellers:', error));
  };

  const handleAdd = () => {
    axios.post('http://localhost:8085/api/users', newSeller)
      .then(response => {
        setSellers(prevSellers => [...prevSellers, response.data]);
        setNewSeller({ name: '', email: '', phone: '' });
      })
      .catch(error => console.error('Error adding seller:', error));

      console.log(newSeller);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8085/api/users/${id}`)
      .then(() => {
        setSellers(prevSellers => prevSellers.filter(seller => seller.id !== id));
      })
      .catch(error => console.error('Error deleting seller:', error));
  };

  const handleEdit = (id) => {
    const sellerToEdit = sellers.find(seller => seller.id === id);
    setEditingSeller(sellerToEdit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingSeller) {
      setEditingSeller({ ...editingSeller, [name]: value });
    } else {
      setNewSeller({ ...newSeller, [name]: value });
    }
  };

  const handleSave = () => {
    if (editingSeller) {
      axios.put(`http://localhost:8085/api/users/${editingSeller.id}`, editingSeller)
        .then(response => {
          setSellers(prevSellers => prevSellers.map(seller =>
            seller.id === editingSeller.id ? response.data : seller
          ));
          setEditingSeller(null);
        })
        .catch(error => console.error('Error updating seller:', error));
    }
  };

  const handleCancel = () => {
    setEditingSeller(null);
  };

  const handleSearch = () => {
    fetchSellers();
  };

  const handleResetSearch = () => {
    setSearchQuery('');
    fetchSellers();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Пользователи</Typography>
      <Box mb={2}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Поиск пользователя"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mr: 1 }}
        />
        <Button variant="contained" style={{ background: 'linear-gradient(45deg, #4CAF50, #8BC34A)', marginTop: '10px'}} onClick={handleSearch} sx={{ mr: 1 }}>Поиск</Button>
        <Button variant="contained" style={{ background: 'linear-gradient(45deg, #4CAF50, #8BC34A)', marginTop: '10px'}} onClick={handleResetSearch}>Сбросить</Button>
      </Box>
      <List>
        {sellers.map(seller => (
          <ListItem key={seller.id} sx={{ display: 'flex', alignItems: 'center' }}>
            {editingSeller && editingSeller.id === seller.id ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="name"
                  value={editingSeller.name}
                  onChange={handleChange}
                  placeholder="Имя"
                  sx={{ mb: 1 }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  name="email"
                  value={editingSeller.email}
                  onChange={handleChange}
                  placeholder="Почта"
                  sx={{ mb: 1 }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  name="phone"
                  value={editingSeller.phone}
                  onChange={handleChange}
                  placeholder="Номер телефона"
                  sx={{ mb: 1 }}
                />
                <Box>
                  <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }} style={{ background: 'linear-gradient(45deg, #4CAF50, #8BC34A)'}} >Добавить</Button>
                  <Button variant="contained" onClick={handleCancel} style={{ background: 'linear-gradient(45deg, #4CAF50, #8BC34A)'}}>Отменить</Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Typography variant="body1" sx={{ flexGrow: 1 }}  >
                  {seller.name} - {seller.email} - {seller.phone}
                </Typography>
                <IconButton onClick={() => handleEdit(seller.id)} sx={{ mr: 1 }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(seller.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </ListItem>
        ))}
      </List>
      <Box mt={3}>
        <Typography variant="h5" style={{ marginBottom: '10px' }}>Добавить</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <TextField
            fullWidth
            variant="outlined"
            name="name"
            value={editingSeller? editingSeller.name : newSeller.name}
            onChange={handleChange}
            placeholder="Имя"
            sx={{ mb: 2 }}
            />
            <TextField
            fullWidth
            variant="outlined"
            name="email"
            value={editingSeller? editingSeller.email : newSeller.email}
            onChange={handleChange}
            placeholder="Почта"
            sx={{ mb: 2 }}
            />
            <TextField
            fullWidth
            variant="outlined"
            name="phone"
            value={editingSeller? editingSeller.phone : newSeller.phone}
            onChange={handleChange}
            placeholder="Номер телефона"
            sx={{ mb: 2 }}
            />
            {editingSeller? (
            <>
                <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>Save</Button>
                <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
            </>
            ) : (
            <Button variant="contained" onClick={handleAdd} style={{ background: 'linear-gradient(45deg, #4CAF50, #8BC34A)'}}>Добавить</Button>
            )}
        </div>
    </Box>

    </Container>
  );
}

export default Sellers;
