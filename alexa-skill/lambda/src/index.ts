import * as alexa from 'ask-sdk-core';
import {launchRequestHandler} from './handlers/launchRequestHandler';
import {helpIntentHandler} from './handlers/helpIntentHanlder';
import {cancelAndStopIntentHandler} from './handlers/cancelAndStopIntentHandler';
import {fallbackIntentHandler} from './handlers/fallbackIntentHandler';
import {sessionEndedRequestHandler} from './handlers/sessionEndedRequestHandler';
import {intentReflectorHandler} from './handlers/intentReflectorHandler';
import {errorHandler} from './handlers/errorHandler';
import {localisationRequestInterceptor} from './interceptors/localisationRequestInterceptor';
import {loggingRequestInterceptor} from './interceptors/logginRequestInterceptor';
import {loggingResponseInterceptor} from './interceptors/logginResponseInterceptor';
import {eventIntentsHandler} from "./handlers/eventsIntentHandler";
import {placesIntentsHandler} from "./handlers/placesIntentHandler";
import {buildDynamoDBAdapter} from "./persistenceAdapterBuilder";

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 */
exports.handler = alexa.SkillBuilders.custom()
    .addRequestHandlers(
        launchRequestHandler,
        eventIntentsHandler,
        placesIntentsHandler,
        helpIntentHandler,
        cancelAndStopIntentHandler,
        fallbackIntentHandler,
        sessionEndedRequestHandler,
        intentReflectorHandler
    )
    .addErrorHandlers(errorHandler)
    .addRequestInterceptors(
        localisationRequestInterceptor,
        loggingRequestInterceptor,
    )
    .withPersistenceAdapter(buildDynamoDBAdapter())
    .withApiClient(new alexa.DefaultApiClient())
    .addResponseInterceptors(loggingResponseInterceptor)
    .lambda();
