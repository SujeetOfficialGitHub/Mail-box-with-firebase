
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthContextProvider } from './store/auth-context';
import { Provider } from 'react-redux';
import store from './store/store';


function App() {
  return (
    <AuthContextProvider>
      <Provider store={store}>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/signup' element={<Signup />} />

        <Route path='/login' element={<Login />} />
      </Routes>
      </Provider>
    </AuthContextProvider>
  );
}

export default App;
