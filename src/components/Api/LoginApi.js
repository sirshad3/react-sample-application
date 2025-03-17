import axios from 'axios';
import { API_BASE_URL } from '../Constant/Constant';
// import { useNavigate } from "react-router-dom";

// const instance = axios.create({
//   baseURL: API_BASE_URL
// });

// You can add common headers or auth tokens here
//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export const loginUser = async (loginPayload) => {
    try {
      const response = await axios.post(API_BASE_URL + '/Auth/login',loginPayload);
      //console.log(response);
      if (response.data !== null)
      {
      return response;
      }
    } catch (error) 
    {
      throw error;
    }
  };
// export const loginUser = async (loginPayload, setInValidUser) => {
//     const navigate = useNavigate();
//     const response = await instance.post('/Auth/login',loginPayload)
//     .then((response) => {
//         const token = response.data.token;
//         localStorage.setItem("token", token);
//         if (token) 
//         {
//           axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//           navigate('/Home'); 
//         }
//         else
//         {
//           console.log('Invalid Token...')
//         }
//     } ).catch(error => 
//       {
//       if (error.response && error.response.status === 401) 
//       {
//         setInValidUser(true)
//       } 
//       else 
//       {
//         console.log('An error occurred.');
//       }
//     });
//};