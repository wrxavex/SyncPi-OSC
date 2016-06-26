var osc = require('osc-min'),
    dgram = require('dgram'),
    remote;

var udp = dgram.createSocket("udp4");



var play_count = 0;

function send() {
  var x = osc.toBuffer({
    oscType: 'message',
    address: '/omxplayer',
    args: [{
      type: 'integer',
      value: 1
    }]
  });

  play_count = play_count + 1;
  var time = new Date();
  console.log('Playing '+play_count+' times at '+time.toLocaleTimeString());


  udp.send(x, 0, x.length, 9998, "127.0.0.1");


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

//setInterval(send, 4000);

send();
