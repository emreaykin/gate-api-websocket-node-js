const WebSocket = require('ws');
var crypto = require('crypto');

const WS_URL = 'wss://api.gateio.ws/ws/v4/';
const ws = new WebSocket(WS_URL);
const api_key = 'YOUR API KEY'
const api_secret = 'YOUR API SECRET'


function gen_sign(channel,event,timestamp) {
    let s = "channel="+channel+"&"+"event="+event+"&"+"time="+timestamp;
    let sign =crypto.createHmac('sha512', api_secret).update(s).digest('hex');
    return {'method': 'api_key', 'KEY': api_key, 'SIGN': sign};
}
var request = {
    "time":Math.round(new Date().getTime() / 1000),
    "channel":"spot.balances",
    "event":"subscribe"
}
request['auth'] = gen_sign(request['channel'],request['event'],request['time']);

ws.on('open', () => {
    console.log('open');
    setInterval(() => {
        ws.send(JSON.stringify(request));
    }, 20000);
    ws.send(JSON.stringify(request));

});

ws.on('message', (data) => {
    console.log(JSON.parse(data.toString()))
 
});
