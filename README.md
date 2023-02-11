# Lab 19: AWS Events

Overview: Using only AWS services: SQS, SNS, and client applications, create a cloud version of the CAPS system.

## Feature Tasks & Requirements:

[CAPS system overview](https://codefellows.github.io/code-401-javascript-guide/curriculum/apps-and-libraries/caps/)

**Required Services**

- SNS Topic (FIFO): pickup which will receive all pickup requests from vendors.
- SQS Queue (FIFO): packages which will contain all delivery requests from vendors, in order of receipt.
  - Subscribe this queue to the pickup topic so all pickups are ordered.
- SQS Queue (Standard) for each vendor (named for the vendor) which will contain all delivery notifications from the drivers.

**Operations**

Vendors:

- Vendors will post “pickup” messages containing delivery information into the SNS pickup topic.
  - ```{ orderId: 1234, customer: "Jane Doe", vendorUrl: queueUrl}```
    - *Note the queueUrl – this refers to the AWS URL of the vendor’s specific SQS Standard Queue.
- Pickup requests should be moved into a SQS FIFO Queue called packages for the drivers automatically.
  - (Make the packages queue a subscriber to the pickup topic).
- Vendors should separately subscribe to their personal SQS Standard Queue and periodically poll the queue to see delivery notifications.

Drivers:

- Drivers will poll the SQS packages queue and retrieve the delivery orders (messages) in order.
- After a time (e.g. 5 seconds), drivers will post a message to the Vendor specific SQS Standard Queue using the queueUrl specified in the order object.

![Whiteboard for lab 19](./lab-19.png)

![Console response]()