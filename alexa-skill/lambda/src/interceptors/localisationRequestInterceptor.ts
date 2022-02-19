// This request interceptor will bind a translation function 't' to the handlerInput
import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import i18n from 'i18next';
import i18next from 'i18next';
import InitOptions = i18next.InitOptions;

const languageStrings = require('../languageStrings');

export const localisationRequestInterceptor = {
    process(handlerInput: HandlerInput) {
        i18n.init({
            lng: alexa.getLocale(handlerInput.requestEnvelope),
            resources: languageStrings,
        } as InitOptions);
    },
};
