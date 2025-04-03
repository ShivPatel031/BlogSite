import amqp from "amqplib";
import { logger } from "./logger.js";
import { config } from "dotenv";
config();

let connection = null;
let channel = null;

const EXCHANGE_NAME = "Blog_eventes";

export async function connectToRabbitMQ() {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, "topic", { durable: false });
    logger.info("Connected to rabbitmq");

    return channel;
  } catch (error) {
    logger.error(`Error connecting to rabbit mq ${error.message}`);
  }
}

export async function publishEvnet(key, message) {
  if (!channel) {
    await connectToRabbitMQ();
  }

  channel.publish(EXCHANGE_NAME, key, Buffer.from(JSON.stringify(message)));

  logger.info(`Event published : ${key}`);
}

export async function consumeEvent(key, callback) {
  if (!channel) {
    await connectToRabbitMQ();
  }

  const q = await channel.assertQueue("", { exclusive: true });

  await channel.bindQueue(q.queue, EXCHANGE_NAME, key);

  channel.consume(q.queue, (msg) => {
    if (msg != null) {
      const content = JSON.parse(msg.content.toString());
      callback(content);
      channel.ack(msg);
    }
  });
  logger.info(`Subscribed to event : ${key}`);
}
