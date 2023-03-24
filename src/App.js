
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { useSelector } from 'react-redux';



function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return (
    <>
      <Header/>
      <Routes>
        {console.log(isLoggedIn)}
        <Route path='/' element={isLoggedIn ? <Home /> : <Navigate replace to='/login' />} />
      
        <Route path='/signup' element={!isLoggedIn ? <Signup /> : <Navigate replace to='/' />} /> 

        <Route path='/login' element={!isLoggedIn ? <Login /> : <Navigate replace to='/' />} /> 
      </Routes>
    </>

  );
}

export default App;
