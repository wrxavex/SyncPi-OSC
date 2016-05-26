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

var omxcallback = dgram.createSocket('udp4', function(msg, rinfo){
  try 
  {
    console.log(osc.fromBuffer(msg));
    console.log("get omx callback");
    send();
  } 
  catch (err) {
    console.log('could not decode OSC message');
  }
});



omxcallback.bind(9999);

// setInterval(send, 4000);

send();
