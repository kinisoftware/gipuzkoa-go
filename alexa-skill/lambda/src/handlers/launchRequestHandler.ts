import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import i18n from 'i18next';

export const launchRequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        return alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput) {
        return handlerInput.responseBuilder
            .speak(i18n.t('WELCOME_MSG'))
            .reprompt('Ey! ¡Hola! ¿Qué quieres hacer?')
            .getResponse();
    },
};
