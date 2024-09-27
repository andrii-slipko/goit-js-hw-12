import axios from 'axios';

const API_KEY = '46068740-edf0cd65fcad07ce38acca64d';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page = 1) => {
    const response = await axios.get(BASE_URL, {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page,
            per_page: 15,
        },
    });
    return response.data;
};