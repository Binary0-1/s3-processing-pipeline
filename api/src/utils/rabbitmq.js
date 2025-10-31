import amqp from "amqplib";

let channel;

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();
    await channel.assertQueue("processing_queue", { durable: true });
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
};

const sendMessage = async (message) => {
  if (!channel) {
    console.error("RabbitMQ channel is not available.");
    return;
  }
  try {
    channel.sendToQueue("processing_queue", Buffer.from(JSON.stringify(message)), { persistent: true });
    console.log("Message sent to RabbitMQ:", message);
  } catch (error) {
    console.error("Error sending message to RabbitMQ:", error);
  }
};

export { connectToRabbitMQ, sendMessage };
