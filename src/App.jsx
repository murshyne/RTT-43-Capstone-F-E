import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Index';
import Home from './components/home_page/index'; 
import AuthPage from './pages/auth/Index'; 
import SignUp from './components/signup_form/Index'; 
import LoginForm from './components/login_form/Index';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        
        {/* Public Routes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/login" element={<LoginForm />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          {/* <Route path="/dashboard" element={<Dashboard />} />  Dashboard page */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
