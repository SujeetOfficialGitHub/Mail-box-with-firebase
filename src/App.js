
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthContextProvider } from './store/auth-context';

function App() {
  return (
    <AuthContextProvider>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Routes>
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
