import React, {createContext, useState} from 'react'

const AuthContext = createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});
export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const initialEmail = localStorage.getItem('email')
    const [token, setToken] = useState(initialToken);
    const [email, setEmail] = useState(initialEmail);

    const userIsLoggedIn = !!token;

    const loginHandler = (token, email) => {
        setToken(token);
        setEmail(email);
        localStorage.setItem('email', email)
        localStorage.setItem('token', token)
    }
    const logoutHandler = () => {
        setToken(null);
        setEmail(null)
        localStorage.removeItem('token')
        localStorage.removeItem('email')
    }
    // After 5 minutes Automatic logout 
    // setTimeout(() => {
    //     setToken(null)
    //     localStorage.removeItem('token')
    // }, (1000*60*5))
    const contextValue = {
        token: token,
        email: email,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };
  return (
    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext