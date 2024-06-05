import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Divider, Box, Select, MenuItem, CircularProgress } from '@mui/material';

function Reports() {
  const [averagePrice, setAveragePrice] = useState(null);
  const [name, setName] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    setLoading(true);
    fetchAveragePrice();
    fetchName();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedOption) {
      setLoading(true);
      fetchSelectedReport(selectedOption);
      setLoading(false);
    }
  }, [selectedOption]);

  const fetchSelectedReport = (reportType) => {
    let url;
    switch (reportType) {
      case 'users':
        url = 'http://localhost:8085/api/reports/get-len-users';
        break;
      case 'products':
        url = 'http://localhost:8085/api/reports/get-len-products';
        break;
      case 'orders':
        url = 'http://localhost:8085/api/reports/get-len-orders';
        break;
      default:
        return;
    }

    axios.get(url)
      .then(response => {
        setReportData(response.data);
        setError(null);
      })
      .catch(error => {
        console.error(`Error fetching ${reportType}:`, error);
        setError(`Error fetching ${reportType}: ${error.message}`);
        setReportData(null);
      });
  };

  const fetchAveragePrice = () => {
    axios.get('http://localhost:8085/api/reports/average-price')
      .then(response => setAveragePrice(response.data))
      .catch(error => console.error('Error fetching average price:', error));
    
  };

  const fetchName = () => {
    axios.get('http://localhost:8085/api/reports/most-popular-order-name')
      .then(response => setName(response.data))
      .catch(error => console.error('Error fetching name:', error));
    
    console.log(axios.get('http://localhost:8085/api/reports/most-popular-order-name').then(response => {
        console.log(response.data)
    }));
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Отчет
      </Typography>

      <Typography variant="h5" gutterBottom>
        Выберите отчет
      </Typography>
      <Select
        value={selectedOption}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="">
          <em>Выберите вариант</em>
        </MenuItem>
        <MenuItem value="users">Количество покупателей</MenuItem>
        <MenuItem value="products">Количество товаров</MenuItem>
        <MenuItem value="orders">Количество заказов</MenuItem>
      </Select>

      {error && <Typography color="error">{error}</Typography>}

      {selectedOption && (
        <List>
          {reportData ? (
            <ListItem>
              <ListItemText primary={`${JSON.stringify(reportData.total)}`} />
            </ListItem>
          ) : (
            <Typography>Загрузка...</Typography>
          )}
        </List>
      )}

      <Divider sx={{ my: 2 }} />

      <Typography variant="h5" gutterBottom>
        Средняя цена всех товаров
      </Typography>
      <List>
        {averagePrice !== null ? (
          <ListItem>
            <ListItemText primary={`Средняя цена: ${averagePrice}`} />
          </ListItem>
        ) : (
          <Typography>Загрузка...</Typography>
        )}
      </List>

      <Typography variant="h5" gutterBottom>
        Наиболее популярный покупатели
      </Typography>
      <List>
        {name !== null ? (
          <ListItem>
            <ListItemText primary={`Покупатели: ${name}`} />
          </ListItem>
        ) : (
          <Typography>Загрузка...</Typography>
        )}
      </List>
    </Box>

    
  );
}

export default Reports;