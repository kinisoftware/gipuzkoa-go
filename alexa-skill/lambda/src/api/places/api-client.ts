import {PlacesResponse} from './models';

const axios = require('axios').default;
const instance = axios.create({
    baseURL: 'http://papi.minube.com',
});

export const places = async (subcategoryId: string): Promise<PlacesResponse> => {
    console.log(`Getting places for subcategory ${subcategoryId}`);
    const url = `/pois?lang=es&country_id=63&zone_id=1010&subcategory_id=${subcategoryId}&api_key=ekhEafvz5R`;
    console.log(`URL ${url}`);
    return instance.get(url);
};
