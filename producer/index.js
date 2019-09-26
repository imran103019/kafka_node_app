'use strict';
require('dotenv').config()

const {
    Kafka,
    logLevel
} = require('kafkajs');

const KAFKA_BROKER_HOST = process.env.KAFKA_BROKER;
const TOPIC = process.env.KAFKA_TOPIC;
const CLIENT_ID = process.env.KAFKA_CLIENT_ID;

const kafka = new Kafka({
    clientId: CLIENT_ID,
    brokers: [KAFKA_BROKER_HOST],
    logLevel: logLevel.ERROR,
    connectionTimeout: 10000
});

const producer = kafka.producer()
const run = async () => {
    await producer.connect();
    setInterval(() => {
        let key = Math.random().toString(36).substring(7);
        let value = Math.random().toString(36).substring(3);
        let message = [{
            key: 'key_'+key,
            value: 'value_'+value
        }];
        console.log(`producing from ${CLIENT_ID}:\n`+JSON.stringify(message)+'\n');
        producer.send({
            topic: TOPIC,
            messages: message,
        });    
    }, 2000);
}

run().catch(console.error)