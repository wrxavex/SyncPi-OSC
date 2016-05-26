var osc = require('osc-min'),
    dgram = require('dgram'),
    remote;
    
var udp = dgram.createSocket("udp4");

function send() {
  var x = osc.toBuffer({
    oscType: 'message',
    address: '/omxplayer',
    args: [{
      type: 'integer',
      value: 1
    }]
  });
  udp.send(x, 0, x.length, 9998, "192.168.1.189");
  udp.send(x, 0, x.length, 9998, "192.168.1.159");
  udp.send(x, 0, x.length, 9998, "192.168.1.160");
}
send();
