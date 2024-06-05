import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper, Alert } from '@mui/material';
import { styled } from '@mui/system';

// Обновление стилизованного компонента для контейнера
const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  borderRadius: '15px',
  backgroundColor: '#f5f5f5',
  boxShadow: '0 4px 30px -12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
}));

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);

const handleLogin = async () => {
    try {
        const success = await onLogin(username, password);
        if (!success) {
            setLoginError(true);
        } else {
            setLoginError(false);
        }
    } catch (error) {
        console.error(error);
        setLoginError(true);
    }
};


    return (
        <Container maxWidth="xs" sx={{ height: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <StyledPaper elevation={6} sx={{ width: '90%', maxWidth: 400 }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ color: '#333' }}>
                    Вход
                </Typography>
                {loginError && ( // Отображаем сообщение об ошибке, если оно есть
                    <Alert severity="error" onClose={() => setLoginError(false)}>
                        Неверный логин или пароль.
                    </Alert>
                )}
                <TextField
                    variant="filled"
                    margin="normal"
                    fullWidth
                    label="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    InputProps={{
                        style: { color: '#333' },
                    }}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    variant="filled"
                    margin="normal"
                    fullWidth
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        style: { color: '#333' },
                    }}
                    sx={{ marginBottom: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLogin}
                    sx={{ marginTop: 2 }}
                    style={{ background: 'linear-gradient(45deg, #4CAF50, #8BC34A)'}}
                >
                    Войти
                </Button>
            </StyledPaper>
        </Container>
    );
};

export default LoginForm;
