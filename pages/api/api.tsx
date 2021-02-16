import axios from 'axios'; 

const ApiService = axios.create({
    baseURL: 'https://api.github.com/',
})

export default ApiService;