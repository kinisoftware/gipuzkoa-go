import {HandlerInput} from 'ask-sdk-core';
import i18n from 'i18next';

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 */
export const errorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput: HandlerInput, error: Error) {
        const speakOutput = i18n.t('ERROR_MSG');
        console.log(`~~~~ Error handled: ${JSON.stringify(error.stack)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    },
};
