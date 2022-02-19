import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import i18n from 'i18next';

export const cancelAndStopIntentHandler = {
    canHandle(handlerInput: HandlerInput) {
        return (
            alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            (alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' ||
                alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent')
        );
    },
    handle(handlerInput: HandlerInput) {
        const speakOutput = i18n.t('GOODBYE_MSG');

        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    },
};
