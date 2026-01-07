import axios from 'axios';

var Axios = axios.create({
  baseURL: 'http://localhost:5111/api',
  // Prostor za dodatnu konfiguraciju
});

export default Axios;