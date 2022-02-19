import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import {city, places, placesByCity} from "../api/places/api-client";

export const placesIntentsHandler = {
    canHandle(handlerInput: HandlerInput) {
        return (
            alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            alexa.getIntentName(handlerInput.requestEnvelope) === 'PlacesIntent'
        );
    },
    async handle(handlerInput: HandlerInput) {
        const placesSlot = alexa.getSlot(handlerInput.requestEnvelope, 'places');
        const citySlot = alexa.getSlot(handlerInput.requestEnvelope, 'city');

        let speakOutput;
        if (placesSlot.resolutions!!.resolutionsPerAuthority!![0].status.code === 'ER_SUCCESS_MATCH') {
            const placeId = placesSlot.resolutions!!.resolutionsPerAuthority!![0].values[0].value.id;

            let placesResponse = undefined;
            if (citySlot) {
                if (citySlot.resolutions!!.resolutionsPerAuthority!![0].status.code === 'ER_SUCCESS_MATCH') {
                    const cityId = citySlot.resolutions!!.resolutionsPerAuthority!![0].values[0].value.id;
                    placesResponse = await placesByCity(placeId, cityId);
                }
            } else {
                placesResponse = await places(placeId);
            }
            console.log(placesResponse);

            const placesInfo = [];
            for (let place of placesResponse!!.data.slice(0, 5)) {
                const cityResponse = await city(place.city_id)
                const cityName = cityResponse.data[0].city_name;
                placesInfo.push(`${place.name} en ${cityName}`);
            }

            speakOutput = `Los sitios son: ${placesInfo.join(' .')}. `;
        } else {
            speakOutput = `Lo siento, aún no tengo recomendaciones sobre ${placesSlot.value}`;
        }

        return handlerInput.responseBuilder
            .speak(speakOutput + " ¿Te puedo ayudar en algo más?")
            .withShouldEndSession(false)
            .getResponse();
    },
};
