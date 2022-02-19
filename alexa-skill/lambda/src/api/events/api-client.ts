import {EventsResponse} from './models';

const axios = require('axios').default;
const instance = axios.create({
    baseURL: 'https://api.euskadi.eus/culture/events/v1.0/events',
});

export const events = async (year: string, month: string): Promise<EventsResponse> => {
    console.log(`Getting events for ${month}-${year}`);
    const url = `/byMonth/${year}/${month}/byProvince/20?_elements=4`;
    console.log(`URL ${url}`);
    return instance.get(url);
};
