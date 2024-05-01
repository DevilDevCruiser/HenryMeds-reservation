import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { Box } from '@mui/material';

import { AuthProvider } from './contexts/auth';
import SignIn from './pages/SignIn';
import ProviderPage from './pages/ProviderPage';
import ClientPage from './pages/ClientPage';
import Navbar from './components/Navbar';
import { useAuthentication } from './hooks/auth';

const withAuth = (Component: React.FC) => {
  return () => {
    const { isAuthenticated } = useAuthentication();
    return isAuthenticated ? <Component /> : <Navigate to="/" />;
  };
}

const AuthProviderPage = withAuth(ProviderPage);
const AuthClientPage = withAuth(ClientPage);

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Box sx={{ padding: 2 }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/provider" element={<AuthProviderPage />} />
              <Route path="/client" element={<AuthClientPage />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </AuthProvider>
    </>
  );
}

export default App;
