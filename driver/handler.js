const {
  ReceiveMessageCommand,
  DeleteMessageCommand,
} = require("@aws-sdk/client-sqs");

const { sqsClient, QUEUES, chance } = require("../utils");

function deliver (orderId) {
  console.log("Driver has finished delivery!", orderId);
  handlePickup();
}

async function handlePickup(){
  try {
    const received = await sqsClient.send( new ReceiveMessageCommand({
      QueueUrl: QUEUES.Pickup,
    }));
    if (received.Messages?.length > 0){
      await sqsClient.send(
        new DeleteMessageCommand({
          QueueUrl: QUEUES.Pickup,
          ReceiptHandle: received.Messages[0].ReceiptHandle,
        })
      );
      const payload = JSON.parse(received.Messages[0].Body);
      console.log("Driver has received pickup event", payload);
      setTimeout(
        () => deliver(payload.orderId),
        chance.integer({ min: 500, max: 1000 })
      );
    } else {
      console.log("no pickup yet!");
      setTimeout(handlePickup, 1000);
    }
  } catch (e) {
    console.error("Failed to handle pickup!", e);
  }
}

function startDriver() {
  console.log("Driver is ready!");
  handlePickup();
}

module.exports = {
  startDriver
}