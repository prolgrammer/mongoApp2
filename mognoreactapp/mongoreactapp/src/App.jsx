import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Sellers from './Sellers';
import Products from './Products';
import Orders from './Orders';
import LoginForm from './LoginForm';
import Reports from './Reports';
import { AppBar, Toolbar, Button, Typography, Container, Box, Alert } from '@mui/material';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authError, setAuthError] = useState(null);
    const [username, setUsername] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Новое состояние для боковой панели
    const [content, setContent] = useState(null); // Состояние для хранения текущего контента
   
    const handleLogin = async (username, password) => {
        try {
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);
    
            const response = await fetch('http://localhost:8085/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Устанавливаем Content-Type в URL-кодированный формат
                    // 'Authorization': 'Basic ' + btoa(username + ':' + password)
                },
                body: formData.toString(), // Преобразуем параметры в строку URL-кодированного формата
            });
            
            console.log(response.status)
            if (response.ok) {
                setIsLoggedIn(true);
                setUsername(username);
                setAuthError(null);
            } else {
                console.error('Ошибка аутентификации');
            }

        } catch (error) {
            console.error('Ошибка:', error);
        }
    };
    
    const handleLogout = () => {
        setIsLoggedIn(false);
        window.location.href = "http://localhost:5173";
    };

    return (
        <Router>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100vh', translate: '25%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '200px', backgroundColor: 'white', textAlign: 'center', marginRight: "100px"}}>

            {isLoggedIn && username === "admin"? (
                <>
              <Link to="/products" style={{width: '100%'}}>
                <button style={{ width: '100%', background: 'linear-gradient(45deg, #4CAF50, #8BC34A)', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', margin: '5px 0', cursor: 'pointer' }}>
                  Комплектующие к ПК</button>
              </Link>
              <Link to="/sellers" style={{width: '100%'}}>
                <button style={{ width: '100%', background: 'linear-gradient(45deg, #4CAF50, #8BC34A)', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', margin: '5px 0', cursor: 'pointer' }}>
                  Покупатели</button>
              </Link>
              <Link to="/orders" style={{width: '100%'}}>
                <button style={{ width: '100%', background: 'linear-gradient(45deg, #4CAF50, #8BC34A)', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', margin: '5px 0', cursor: 'pointer' }}>
                  Заказы</button>
              </Link>
              <Link to="/reports" style={{width: '100%'}}>
                <button style={{ width: '100%', background: 'linear-gradient(45deg, #4CAF50, #8BC34A)', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', margin: '5px 0', cursor: 'pointer' }}>
                  Отчеты</button>
              </Link>  </>
            ) : null}

            {isLoggedIn && username === "editor"? (
                <>
              <Link to="/products" style={{width: '100%'}}>
                <button style={{ width: '100%', background: 'linear-gradient(45deg, #4CAF50, #8BC34A)', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', margin: '5px 0', cursor: 'pointer' }}>
                  Комплектующие к ПК</button>
              </Link>
              <Link to="/orders" style={{width: '100%'}}>
                <button style={{ width: '100%', background: 'linear-gradient(45deg, #4CAF50, #8BC34A)', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', margin: '5px 0', cursor: 'pointer' }}>
                  Заказы</button>
              </Link>
                </>
            ) : null}

            {isLoggedIn && username === "reader"? (
                <>
              <Link to="/products" style={{width: '100%'}}>
                <button style={{ width: '100%', background: 'linear-gradient(45deg, #4CAF50, #8BC34A)', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', margin: '5px 0', cursor: 'pointer' }}>
                  Комплектующие к ПК</button>
              </Link>
              </>
            ) : null}
            </div>
            <div className='content'>
                    <Routes>
                        {!isLoggedIn && <Route path="/" element={<LoginForm onLogin={handleLogin} />} />}
                        {isLoggedIn && (
                            <>
                                <Route path="/sellers" element={<Sellers />} />
                                <Route path="/products" element={<Products />} />
                                <Route path="/orders" element={<Orders />} />
                                <Route path="/reports" element={<Reports />} />
                            </>
                        )}
                    </Routes>
                </div>
          </div>
        </Router>
      );
      
    
}

export default App;
            {/* <nav>
            <div style={{ display: 'flex', alignItems: 'center'}}>
                <div style={{ marginRight: '-50%' }}> {/* Это первый контейнер для выравнивания слева */}
        //         <Container 
        //             className='content'
        //             sx={{
        //             display: 'flex', // Используем flexbox для родительского контейнера
        //             justifyContent: 'flex-start', // Выравниваем по левому краю
        //             alignItems: 'center', // Центрирование по вертикали
        //             minWidth: '100vw', // Минимальная ширина равна ширине окна браузера
        //             paddingLeft: '16px', // Добавляем небольшой отступ слева для кнопок
        //             }}
        //         >
        //             <div className='content'>
        //             <Box 
        //             sx={{
        //                 width: '20%', // Ширина контейнера с кнопками
        //                 backgroundColor: 'white',
        //                 padding: 0,
        //                 borderRadius: '8px', // Закругленные углы
        //                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Тень
        //                 overflow: 'hidden', // Чтобы тень корректно отображалась вокруг контейнера
        //                 listStyleType: 'none', // Убираем маркеры списка
        //                 display: 'flex', // Используем flexbox для упорядочивания кнопок
        //                 flexDirection: 'column', // Структура кнопок в столбец
        //                 alignItems: 'flex-start', // Выравнивание кнопок по началу строки
        //             }}
        //             >
        //             {isLoggedIn && username === "admin"? (
        //                 <>
        //                 <li style={{ display: 'block', width: '100%' }}><Link to="/sellers" aria-label="Перейти к списку продавцов"><Button variant="contained">Клиенты</Button></Link></li>
        //                 <li style={{ color: 'red', backgroundColor: 'yellow' }}><Link to="/products" aria-label="Перейти к продукции"><Button variant="contained">Комплектующие к ПК</Button></Link></li>
        //                 <li style={{ flex: 1 }}><Link to="/orders" aria-label="Перейти к заказам"><Button variant="contained">Заказы</Button></Link></li>
        //                 <li ><Link to="/reports" aria-label="Перейти к отчетам"><Button variant="contained">Отчеты</Button></Link></li>
        //                 </>
        //             ) : null}

        //             {isLoggedIn && username === "editor"? (
        //                 <>
        //                 <li><Link to="/products" aria-label="Перейти к продукции"><Button variant="contained">Комплектующие к ПК</Button></Link></li>
        //                 <li><Link to="/orders" aria-label="Перейти к заказам"><Button variant="contained">Заказы</Button></Link></li>
        //                 <li><Link to="/reports" aria-label="Перейти к отчетам"><Button variant="contained">Отчеты</Button></Link></li>
        //                 </>
        //             ) : null}

        //             {isLoggedIn && username === "reader"? (
        //                 <>
        //                 <li><Link to="/products" aria-label="Перейти к продукции"><Button variant="contained">Комплектующие к ПК</Button></Link></li>
        //                 </>
        //             ) : null}
        //             </Box>
        //             </div>
        //         </Container>
        //         </div>
        //     </div>
        //                 <Routes>
        //                 {!isLoggedIn && <Route path="/" element={<LoginForm onLogin={handleLogin} />} />}
        //                 {isLoggedIn && (
        //                     <>
        //                     <Route path="/sellers" element={<Sellers />} />
        //                     <Route path="/products" element={<Products />} />
        //                     <Route path="/orders" element={<Orders />} />
        //                     <Route path="/reports" element={<Reports />} />
        //                     </>
        //                 )}
        //                 </Routes>
        //     </nav>
        //   </div>
        // </Router> */}
