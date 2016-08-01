export default (rabbitMqService) => (type, payload, clientId = null) => {
  rabbitMqService.publish({
    type,
    payload,
    clientId,
  });

  return 'OK';
};
