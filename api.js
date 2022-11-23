const GateApi = require('gate-api');
const client = new GateApi.ApiClient();
// uncomment the next line to change base path
// client.basePath = "https://some-other-host"
// Configure Gate APIv4 key authentication:
client.setApiKeySecret("YOUR_API_KEY", "YOUR_API_SECRET");

const api = new GateApi.WalletApi(client);
const opts = {
  'currency': 'USDT' // string | Currency unit used to calculate the balance amount. BTC, CNY, USD and USDT are allowed. USDT is the default.
};
api.getTotalBalance(opts)
   .then(value => console.log('API called successfully. Returned data: ', value.body),
         error => console.error(error));