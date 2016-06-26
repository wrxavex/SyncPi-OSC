var osc = require('osc-min'),
    dgram = require('dgram'),
    // omx = require('omxcontrol'),
    fs = require('fs'),
    exec = require('child_process').exec,
    remote;

var video_id = fs.readFileSync('set_id', 'utf8');
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


    // omx.start('/home/pi/pier2/v-'+video_id+'.mp4');

    // exec('/opt/vc/bin/vcgencmd measure_temp', function(error, stdout, stderr) {
    //     console.log('stdout: ' + stdout);
    //     console.log('stderr: ' + stderr);
    //     if (error !== null) {
    //         console.log('exec error: ' + error);
    //     }
    // });

    console.log('Playing '+play_count+' times at '+time.toLocaleTimeString());


    var playing_status = 'playing ' + play_count + ' times at ' + time.toLocaleTimeString();

    setTimeout(function(str1, str2) {
      console.log(str1 + " " + str2);


        var x = osc.toBuffer({
          oscType: 'message',
          address: '/omxplayer',
          args: [{
            type: 'integer',
            value: 1
          }]
        });

      udp.send(x, 0, x.length, 9999, "127.0.0.1");




    }, 3000, "Hello.", "How are you?");
    
    
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
