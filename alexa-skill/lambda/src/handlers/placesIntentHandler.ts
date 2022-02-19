import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import {places} from "../api/places/api-client";

export const placesIntentsHandler = {
    canHandle(handlerInput: HandlerInput) {
        return (
            alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            alexa.getIntentName(handlerInput.requestEnvelope) === 'PlacesIntent'
        );
    },
    async handle(handlerInput: HandlerInput) {

        const placesResponse = await places(40);
        console.log(placesResponse);
        const speakOutput = `Los sitios son: ${placesResponse.data.map((place) => place.name).join(' .')}. `;


        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    },
};
