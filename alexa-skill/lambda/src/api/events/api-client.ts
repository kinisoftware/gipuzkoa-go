import {EventsResponse} from './models';

const axios = require('axios').default;
const instance = axios.create({
    baseURL: 'https://api.euskadi.eus/culture/events/v1.0/events',
});

const PROVINCE_ID = 48;

export const events = async (year: number, month: number): Promise<EventsResponse> => {
    console.log(`Getting events for ${month}-${year}`);
    const url = `/byMonth/${year}/${month}/byProvince/${PROVINCE_ID}?_elements=10&_page=1`;
    console.log(`URL ${url}`);
    return instance.get(url);
};
