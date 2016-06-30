var osc = require('osc-min'),
    dgram = require('dgram'),
    omx = require('omxcontrol'),
    fs = require('fs'),
    exec = require('child_process').exec,
    remote;

var video_id = fs.readFileSync('/boot/set_id', 'utf8');
video_id = video_id.replace(/(\r\n|\n|\r)/gm,"");

var play_count = 0;
    
// listen for OSC messages and print them to the console
var udp = dgram.createSocket('udp4', function(msg, rinfo) {
  var osc_message;
  // save the remote address
  remote = rinfo.address;
  try {
    osc_message = osc.fromBuffer(msg);
    console.log('args[0]= '+osc_message.args[0].value);
    console.log('args[1]= '+osc_message.args[1].value);
    if (osc_message.args[0] != "1") {
        console.log('it\'s master\'s message');
    }
    play_count = play_count + 1;
    var time = new Date();

    omx.start('/home/pi/nmh/v-'+video_id+'.mp4');
    exec('/opt/vc/bin/vcgencmd measure_temp', function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });

    console.log('Playing '+play_count+' times at '+time.toLocaleTimeString());


    var playing_status = 'playing ' + play_count + ' times at ' + time.toLocaleTimeString();
    
    
    fs.writeFile('playing_status.txt', playing_status, (err) => {
      if (err){
          throw err;
      } 
      console.log('It\'s saved!');
});
  } catch (err) {
    console.log('Could not decode OSC message');
  }

});

udp.bind(9998);
console.log('Listening for OSC messages on port 9998');
