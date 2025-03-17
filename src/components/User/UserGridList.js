import axios from 'axios';
import { API_BASE_URL } from '../Constant/Constant';
  
   export const getUsers =  async () => {
      try {
      // console.log('getUsers...')
         const token = localStorage.getItem("token");
         let response = null
          //console.log(token)
         if (token) 
         {
           axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
           response = await axios.get( API_BASE_URL + '/Users/GetUsers');

          //console.log('get data from api');
              if (response.data !== null)
              {
                //console.log('Data return... from api');
                  return response;
              }
         }
      } catch (error) 
      {
        throw error;
      }
    };
export const displayModeLabel = { 'aria-label': 'Refresh Mode' };