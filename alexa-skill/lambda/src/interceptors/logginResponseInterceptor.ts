import {HandlerInput} from 'ask-sdk-core';
import {Response} from 'ask-sdk-model';

export const loggingResponseInterceptor = {
    process(handlerInput: HandlerInput, response: Response) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`);
    },
};
