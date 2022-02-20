import {EventsResponse} from './models';

const axios = require('axios').default;
const instance = axios.create({
    baseURL: 'https://api.euskadi.eus/culture/events/v1.0/events',
});

export const events = async (year: string, month: string, day: string): Promise<EventsResponse> => {
    console.log(`Getting events for ${day}-${month}-${year}`);
    const url = `/byDate/${year}/${month}/${day}/byProvince/20?_elements=5`;
    console.log(`URL ${url}`);
    return instance.get(url);
};

export const eventsByCity = async (year: string, month: string, day: string, city: string): Promise<EventsResponse> => {
    console.log(`Getting events for the city ${city} at ${day}-${month}-${year}`);
    const url = `/byDate/${year}/${month}/${day}/byMunicipality/20/${city}?_elements=5`;
    console.log(`URL ${url}`);
    return instance.get(url);
};
