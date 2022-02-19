import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import {events} from "../api/events/api-client";
import {Event} from "../api/events/models";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

const speakEvent = (event: Event): string => {
    let date;
    if (event.startDate === event.endDate) {
        const eventDate = moment(event.startDate, 'YYYY-MM-DD');
        const month = eventDate.month() < 10 ? `0${eventDate.month() + 1}` : eventDate.month();
        const day = eventDate.day();
        date = `el día <say-as interpret-as="date" format="dm">${day}-${month}</say-as>`;
    } else {
        const startEventDate = moment(event.startDate, 'YYYY-MM-DD');
        const startMonth = startEventDate.month() < 10 ? `0${startEventDate.month() + 1}` : startEventDate.month();
        const startDay = startEventDate.day();
        const endEventDate = moment(event.endDate, 'YYYY-MM-DD');
        const endMonth = endEventDate.month() < 10 ? `0${endEventDate.month() + 1}` : endEventDate.month();
        const endDay = endEventDate.day();
        date = `del <say-as interpret-as="date" format="dm">${startDay}-${startMonth}</say-as> al <say-as interpret-as="date" format="dm">${endDay}-${endMonth}</say-as>`;
    }

    const lugar = event.municipalityEs.split(',')[0];

    return `${date}, en ${lugar}, ${event.nameEs}`;
};

export const eventIntentsHandler = {
    canHandle(handlerInput: HandlerInput) {
        return (
            alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            alexa.getIntentName(handlerInput.requestEnvelope) === 'EventsIntent'
        );
    },

    async handle(handlerInput: HandlerInput) {

        const year = moment().year();
        const month = moment().month() < 10 ? `0${moment().month() + 1}` : moment().month();

        const eventsResponse = await events(year, month);
        const speakOutput = `La agenda es: ${eventsResponse.data.items
            .map((event) => speakEvent(event)).join(' .')}. `;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    },
};
