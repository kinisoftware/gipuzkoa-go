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
        const placesSlot = alexa.getSlot(handlerInput.requestEnvelope, 'places');

        let speakOutput;
        if (placesSlot.resolutions!!.resolutionsPerAuthority!![0].status.code === 'ER_SUCCESS_MATCH') {
            const placeId = placesSlot.resolutions!!.resolutionsPerAuthority!![0].values[0].value.id;
            const placesResponse = await places(placeId);
            console.log(placesResponse);
            speakOutput = `Los sitios son: ${placesResponse.data.slice(0, 5).map((place) => place.name).join(' .')}. `;
        } else {
            speakOutput = `Lo siento, aún no tengo recomendaciones sobre ${placesSlot.value}`;
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    },
};
