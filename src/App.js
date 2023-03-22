import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header/Header';
import Signup from './pages/Signup';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
