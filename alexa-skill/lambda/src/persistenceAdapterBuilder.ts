import { DynamoDbPersistenceAdapter } from 'ask-sdk-dynamodb-persistence-adapter';
import * as alexa from 'ask-sdk-core';
import { PersistenceAdapter } from 'ask-sdk-core';
import AWS = require('aws-sdk');

export function buildDynamoDBAdapter(dynamoDBClient?: AWS.DynamoDB): PersistenceAdapter {
    return new DynamoDbPersistenceAdapter({
        tableName: 'skill_gipuzkoa_go',
        createTable: true,
        partitionKeyGenerator: (requestEnvelope) => {
            const userId = alexa.getUserId(requestEnvelope);
            return userId.substr(userId.lastIndexOf('.') + 1);
        },
        dynamoDBClient,
    });
}
