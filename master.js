var osc = require('osc-min'),
    dgram = require('dgram'),
    remote;
    
var udp = dgram.createSocket("udp4");



var play_count = 0;

function send() {
  var x = osc.toBuffer({
    oscType: 'message',
    address: '/omxplayer',
    args: [
        {
          type: 'integer',
          value: 1
        },
        {
            type: 'integer',
            value: 2
        }
    ]
  });

  play_count = play_count + 1;
  var time = new Date();
  console.log('Playing '+play_count+' times at '+time.toLocaleTimeString());

  setTimeout(function(){
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
  }, 3000);

}

var omxcallback = dgram.createSocket('udp4', function(msg, rinfo){
  try 
  {
    console.log(osc.fromBuffer(msg));
    var osc_message;
    osc_message = osc.fromBuffer(msg);
    if (parseInt(osc_message.args[0].value) == 2) {
      console.log("get slave no.2 callback");
    }
    if (parseInt(osc_message.args[0].value) == 255) {
      console.log("get omx callback");
      send();
    }

  } 
  catch (err) {
    console.log('could not decode OSC message');
  }
});



omxcallback.bind(9999);

// setInterval(send, 4000);

send();
