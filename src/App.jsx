import './App.css';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/auth/Index';  // The auth page for Login/Sign Up
import Navbar from './components/navbar/Index';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/auth' element={<AuthPage />} />
        <Route element={<ProtectedRoutes />}>
        </Route>
      </Routes>
    </>
  );
}

export default App;
