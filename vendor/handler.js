const { SendMessageCommand } = require("@aws-sdk/client-sqs");
const { sqsClient, chance, QUEUES } = require("../utils");

async function sendPickup(vendorId){
  const event = {
    vendor: chance.company(vendorId),
    store: chance.city(),
    orderId: chance.guid().substring(0, 8),
    customer: chance.name({nationality : 'it', suffix : true }),
    address: chance.address(),
  };
  console.log("Vendor asking for pickup!", event.vendor, event);

  try {
    const message = await sqsClient.send(
      new SendMessageCommand({
        MessageBody: JSON.stringify(event),
        MessageGroupId: vendorId,
        QueueUrl: QUEUES.Pickup,
      })
    );
    console.log("Pickup request!", message.MessageId);
    return message;
  } catch (e) {
    console.error("Failed to send message", e);
  }
}

function startVendor(name) {
  console.log("Vendor is ready!");

  function ready () {
    sendPickup(name);

    setTimeout(ready, chance.integer({ min: 3000, max: 4000}));
  }
  ready();
}

module.exports = {
  startVendor,
}