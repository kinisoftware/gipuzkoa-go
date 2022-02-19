import {HandlerInput} from 'ask-sdk-core';

export const loggingRequestInterceptor = {
    process(handlerInput: HandlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    },
};
