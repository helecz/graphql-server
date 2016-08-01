import amqp from 'amqplib';

export class RabbitMqService {

  constructor(channel, routingKey) {
    this.channel = channel;
    this.routingKey = routingKey;
  }

  publish(message) {
    this.channel.sendToQueue(this.routingKey, new Buffer(JSON.stringify(message)));
  }

  consume(callback) {
    this.channel.assertQueue(this.routingKey, {
      durable: true,
      autoDelete: true,
    })
      .then(() => {
        this.channel.bindQueue(this.routingKey, 'graphql-result', '');
        this.channel.consume(this.routingKey, (msg) => {
          this.channel.ack(msg);
          callback(JSON.parse(msg.content.toString()));
        });
      });
  }

}

export default (url, routingKey) =>
  amqp.connect(url)
    .then((connection) => connection.createChannel())
    // .then((channel) => channel.assertQueue(routingKey))
    .then((channel) => new RabbitMqService(channel, routingKey))
    .catch(console.warn);
