import axios from 'axios';

export const fetchPins = () => axios.get('http://localhost:8080/api/pins').then((res) => res);