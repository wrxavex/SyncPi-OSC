var osc = require('osc-min'),
    dgram = require('dgram'),
    omx = require('omxcontrol'),
    remote;

// listen for OSC messages and print them to the console
var udp = dgram.createSocket('udp4', function(msg, rinfo) {

  // save the remote address
  remote = rinfo.address;

  try {
    console.log(osc.fromBuffer(msg));
    omx.start('/home/pi/SyncPi8/Final.mp4')
  } catch (err) {
    console.log('Could not decode OSC message');
  }

});



udp.bind(9998);
console.log('Listening for OSC messages on port 9998');
