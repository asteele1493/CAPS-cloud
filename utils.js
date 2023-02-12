const clientSqs = require("@aws-sdk/client-sqs");
const Chance = require("chance");

const { SQSClient } = clientSqs;

const REGION = "us-west-2";

const sqsClient = new SQSClient({ region: REGION });

const chance = new Chance();

//link to AWS queue
const QUEUES = {
  Pickup: "https://sqs.us-west-2.amazonaws.com/323192167715/capsPickup.fifo",
}

module.exports = { sqsClient, chance, QUEUES };