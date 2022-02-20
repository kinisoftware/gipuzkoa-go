import * as alexa from 'ask-sdk-core';
import {HandlerInput} from 'ask-sdk-core';
import i18n from 'i18next';
import {PersistentAttributes} from "../model/persistentAttributes";

export const launchRequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        return alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput: HandlerInput) {
        let firstTime = true;
        const persistentAttributes =
            (await handlerInput.attributesManager.getPersistentAttributes()) as PersistentAttributes;

        if (persistentAttributes.firstTime === undefined) {
            persistentAttributes.firstTime = false;
            handlerInput.attributesManager.setPersistentAttributes(persistentAttributes);
            await handlerInput.attributesManager.savePersistentAttributes();
        } else {
            firstTime = false;
        }

        const {requestEnvelope, serviceClientFactory, responseBuilder} = handlerInput;
        let spoke = firstTime ? i18n.t('WELCOME_MSG_FT') : i18n.t('WELCOME_MSG');

        const {permissions} = requestEnvelope.context.System.user;
        if (permissions && permissions.consentToken && serviceClientFactory) {
            console.log('Getting profile name')
            try {
                const client = serviceClientFactory.getUpsServiceClient();
                const userName = await client.getProfileGivenName();
                if (userName) {
                    spoke = firstTime ? i18n.t('WELCOME_WITH_NAME_MSG_FT', {userName}) : i18n.t('WELCOME_WITH_NAME_MSG', {userName});
                }
            } catch (error) {
                throw error;
            }
        }

        return responseBuilder
            .speak(`<audio src="soundbank://soundlibrary/wood/moves/moves_01"/>${spoke}`)
            .reprompt(spoke)
            .getResponse();
    },
};
