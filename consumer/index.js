'use strict';
require('dotenv').config()
const {
    Kafka,
    logLevel
} = require('kafkajs');

const KAFKA_BROKER_HOST = process.env.KAFKA_BROKER;
const TOPIC = process.env.KAFKA_TOPIC;
const KAFKA_MYSQL_CONNECTOR_TOPIC = process.env.KAFKA_MYSQL_CONNECTOR_TOPIC;
const GROUP_ID = process.env.KAFKA_GROUP_ID;
const CLIENT_ID = process.env.KAFKA_CLIENT_ID;

const kafka = new Kafka({
    clientId: CLIENT_ID,
    brokers: [KAFKA_BROKER_HOST],
    logLevel: logLevel.ERROR,
    connectionTimeout: 10000
});


const consumer = kafka.consumer({
    groupId: GROUP_ID
})

const mysqlConsumer = kafka.consumer({
    groupId: 'mysql_connector_group'
})

const run = async () => {
    
    // subscribing topic (producer1)
    await consumer.subscribe({
        topic: TOPIC,
        fromBeginning: true
    });
    await consumer.run({
        eachMessage: async ({
            topic,
            partition,
            message
        }) => {
            console.log(`Receiving from ${CLIENT_ID}:\n`+'KEY:' + message.key + ', VALUE: ' + message.value);
        },
    })


    // subscribing topic (mysql events)
    await mysqlConsumer.subscribe({
        topic: KAFKA_MYSQL_CONNECTOR_TOPIC,
        fromBeginning: true
    });

    await mysqlConsumer.run({
        eachMessage: async ({
            topic,
            partition,
            message
        }) => {
            console.log(`Receiving from ${CLIENT_ID}:\n`+'KEY:' + message.key + ', VALUE: ' + message.value);
        },
    })
}

run().catch(console.error)