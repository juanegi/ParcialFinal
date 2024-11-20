const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'Pruebas_Final',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

