import React from 'react';
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

const useAxsios = () => {
    return axiosSecure;
};

export default useAxsios;