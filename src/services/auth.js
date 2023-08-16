// src/services/auth.js
export const setAuthData = (token, nameUser) => {
    localStorage.setItem('token', token);
    localStorage.setItem('nameUser', nameUser);
  };
  
  export const getAuthData = () => {
    const token = localStorage.getItem('token');
    const nameUser = localStorage.getItem('nameUser');
    return { token, nameUser };
  };
  
  export const removeAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nameUser');
  };
  
  export const isAuthenticated = () => {
    const authData = getAuthData();
    return authData.token !== null;
  };
  