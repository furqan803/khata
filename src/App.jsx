import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Notebook from './pages/Notebook';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import Login from './pages/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    return localStorage.getItem('khata_auth') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('khata_auth', 'true');
    setIsLoggedIn(true);
  };

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/" element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<Home />} />
            <Route path="chat/:id" element={<Chat />} />
            <Route path="notebook" element={<Notebook />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
