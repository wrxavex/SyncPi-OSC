var osc = require('osc-min'),
    dgram = require('dgram'),
    omx = require('omxcontrol'),
    fs = require('fs'),
    remote;

var video_id = fs.readFileSync('/boot/set_id', 'utf8');
video_id = video_id.replace(/(\r\n|\n|\r)/gm,"");

var play_count = 0;
    
// listen for OSC messages and print them to the console
var udp = dgram.createSocket('udp4', function(msg, rinfo) {

  // save the remote address
  remote = rinfo.address;

  try {
    console.log(osc.fromBuffer(msg));

    play_count = play_count + 1;
    var time = new Date();
    console.log('Playing '+play_count+' times at '+time.toLocaleTimeString());

    omx.start('/home/pi/nmh/v-'+video_id+'.mp4')
  } catch (err) {
    console.log('Could not decode OSC message');
  }

});

udp.bind(9998);
console.log('Listening for OSC messages on port 9998');
