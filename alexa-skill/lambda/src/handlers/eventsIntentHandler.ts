import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import {events} from "../api/events/api-client";
import {Event} from "../api/events/models";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

const speakEvent = (event: Event, withPlaceInfo: boolean): string => {
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

    if (withPlaceInfo) {
        const lugar = event.municipalityEs.split(',')[0];
        return `${date}, en ${lugar}, ${event.nameEs}`;
    } else {
        return `${date}, ${event.nameEs}`;
    }
};

export const eventIntentsHandler = {
    canHandle(handlerInput: HandlerInput) {
        return (
            alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            alexa.getIntentName(handlerInput.requestEnvelope) === 'EventsIntent'
        );
    },

    async handle(handlerInput: HandlerInput) {
        const citySlot = alexa.getSlot(handlerInput.requestEnvelope, 'municipality');

        const year = moment().year();
        const month = moment().month() < 10 ? `0${moment().month() + 1}` : moment().month();

        let agenda = undefined;
        let withCityInfo = true;
        if (citySlot && citySlot.resolutions) {
            if (citySlot.resolutions!!.resolutionsPerAuthority!![0].status.code === 'ER_SUCCESS_MATCH') {
                const cityId = citySlot.resolutions!!.resolutionsPerAuthority!![0].values[0].value.id;
                const eventsResponse = await events(year, month);
                agenda = eventsResponse.data.items.filter((event) => event.municipalityNoraCode.toString() === cityId)
            }
            withCityInfo = false;
        } else {
            const geoObject = handlerInput.requestEnvelope.context.Geolocation;
            if (geoObject) {
                console.log("Filtering by geolocation");
                agenda = (await events(year, month)).data.items
                    .filter((event) =>
                        event.municipalityLatitude + 100 > geoObject.coordinate!!.latitudeInDegrees && event.municipalityLatitude - 100 < geoObject.coordinate!!.latitudeInDegrees
                    )
                    .filter((event) =>
                        event.municipalityLongitude + 100 > geoObject.coordinate!!.longitudeInDegrees && event.municipalityLongitude - 100 < geoObject.coordinate!!.longitudeInDegrees
                    );
            } else {
                agenda = (await events(year, month)).data.items;
            }
        }

        const speakOutput = `La agenda es: ${agenda!!.map((event) => speakEvent(event, withCityInfo)).join(' .')}. `;

        return handlerInput.responseBuilder
            .speak(speakOutput + " ¿Te puedo ayudar en algo más?")
            .withShouldEndSession(false)
            .getResponse();
    },
};
