import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import {events} from "../api/events/api-client";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

export const eventIntentsHandler = {
    canHandle(handlerInput: HandlerInput) {
        return (
            alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            alexa.getIntentName(handlerInput.requestEnvelope) === 'EventsIntent'
        );
    },
    async handle(handlerInput: HandlerInput) {

        const year = moment().year();
        const month = moment().month();

        const eventsResponse = await events(year, month);
        console.log(eventsResponse);
        const speakOutput = `La agenda es: ${eventsResponse.data.items.map((event) => event.nameEs).join(' .')}. `;


        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    },
};
