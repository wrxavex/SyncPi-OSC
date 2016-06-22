var osc = require('osc-min'),
    dgram = require('dgram'),
    remote;
    
var udp = dgram.createSocket("udp4");

function send() {
  var x = osc.toBuffer({
    oscType: 'message',
    address: '/omxplayer',
    args: [{
      type: 'string',
      value: 1
    }]
  });
  udp.send(x, 0, x.length, 9998, "192.168.1.201");
  udp.send(x, 0, x.length, 9998, "192.168.1.202");
  udp.send(x, 0, x.length, 9998, "192.168.1.203");
  udp.send(x, 0, x.length, 9998, "192.168.1.204");
  udp.send(x, 0, x.length, 9998, "192.168.1.205");
  udp.send(x, 0, x.length, 9998, "192.168.1.206");
  udp.send(x, 0, x.length, 9998, "192.168.1.207");
  udp.send(x, 0, x.length, 9998, "192.168.1.208");
  udp.send(x, 0, x.length, 9998, "192.168.1.209");
  udp.send(x, 0, x.length, 9998, "192.168.1.210");
  udp.send(x, 0, x.length, 9998, "192.168.1.211");
  udp.send(x, 0, x.length, 9998, "192.168.1.212");
  
  udp.send(x, 0, x.length, 9998, "192.168.1.191");
  udp.send(x, 0, x.length, 9998, "192.168.1.190");
  udp.send(x, 0, x.length, 9998, "192.168.1.192");
  udp.send(x, 0, x.length, 9998, "192.168.1.199");
  udp.send(x, 0, x.length, 9998, "192.168.1.198");
  udp.send(x, 0, x.length, 9998, "192.168.1.200");
  udp.send(x, 0, x.length, 9998, "192.168.1.159");
  udp.send(x, 0, x.length, 9998, "192.168.1.188");
  udp.send(x, 0, x.length, 9998, "192.168.1.189");

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
