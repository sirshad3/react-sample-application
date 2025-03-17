// import axios from 'axios';
// import { useCallback } from 'react';
// import { API_BASE_URL } from '../Constant/Constant';
// import { useNavigate } from 'react-router-dom';


// export const checkToken_And_ExpirationTime =  async () => {
// // console.log('Call checkToken_And_ExpirationTime ..')
// // const api = axios.create({
// //   baseURL: API_BASE_URL,
// // });

// // api.interceptors.request.use(
// //   (config) => {
// //     console.log(config)
//     let token = null;
//     if (localStorage.getItem('token') !== 'undefined' || localStorage.getItem('token') !== null)
//     {
//      token = localStorage.getItem('token');
//     }
//     console.log(token)
//     if (token) {
//       const decodedToken = JSON.parse(atob(token.split('.')[1]));
//       console.log(decodedToken.exp)
//       console.log(Date.now())
//       if (decodedToken.exp * 1000 < Date.now()) {
//         localStorage.removeItem('token');
//         // Programmatically redirect to login page
//         // window.location.href = '/';
//         //return Promise.reject({ response: { statusText: 'Token expired' } });
//        return false
//       }
//       //config.headers.Authorization = `Bearer ${token}`;
//       return true
//     }
//     //return config;
//     return true
//   }
//   //,(error) => { return Promise.reject(error)}
// //);
// //}
// //export default api;
// // import { useNavigate } from "react-router-dom";

// // const instance = axios.create({
// //   baseURL: API_BASE_URL
// // });

// // You can add common headers or auth tokens here
// //instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// //export const getUsers =  async () => {
//     // try {
//     // // console.log('getUsers')
//     //    const token = localStorage.getItem("token");
//     //    let response = null
   
//     //    if (token) 
//     //    {
//     //      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     //    }
//     //    response = await instance.get('/Users/GetUsers');
//     //   //console.log(response);
//     //   if (response.data !== null)
//     //   {
//     //     console.log(response.data);
//     //   return response;
//     //   }
//     // } catch (error) 
//     // {
//     //   throw error;
//     // }
//   //};

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckTokenExistenceAndExpiry = () => {
    console.log('CheckTokenExistenceAndExpiry Call...')
  const navigate = useNavigate();
  useEffect(() => {
  
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = decodedToken.exp * 1000;
      const now = Date.now();
      const timeLeft = expirationTime - now;

      if (timeLeft <= 0) {
        localStorage.removeItem('token');
        navigate('/');
      // window.location.href = '/';
      } 
    //   else {
    //     const timer = setTimeout(() => {
    //       localStorage.removeItem('token');
    //       navigate('/');
    //      //window.location.href = '/';
    //     }, timeLeft);

    //     return () => clearTimeout(timer);
    //   }
    }
 }, [navigate]);

  // ... rest of your component
}

export default CheckTokenExistenceAndExpiry;