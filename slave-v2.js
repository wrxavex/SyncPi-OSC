var VideoPlayer = require('./playing_status');


var osc = require('osc-min'),
    dgram = require('dgram'),
    omx = require('omxcontrol'),
    fs = require('fs'),
    exec = require('child_process').exec,
    remote;


var video_id = fs.readFileSync('/boot/sync_setting.txt', 'utf8');


var master_id = "192.168.1.231";

video_id = video_id.replace(/(\r\n|\n|\r)/gm,"");
video_id = video_id.substring(3, 5);
video_id = parseInt(video_id);

var vp = new VideoPlayer(video_id);


// listen for OSC messages and print them to the console
var udp = dgram.createSocket('udp4', function(msg, rinfo) {
    var osc_message;




    var x = osc.toBuffer({
        oscType: 'message',
        address: '/omxplayer',
        args: [
            {
                type: 'integer',
                value: parseInt(vp.video_id)
            },
            {
                type: 'integer',
                value: 1
            }
        ]
    });

    var x_end = osc.toBuffer({
        oscType: 'message',
        address: '/omxplayer',
        args: [
            {
                type: 'integer',
                value: parseInt(vp.video_id)
            },
            {
                type: 'integer',
                value: 2
            }
        ]
    });

    // save the remote address
    remote = rinfo.address;
    try {

        osc_message = osc.fromBuffer(msg);
        console.log('args[0]= '+osc_message.args[0].value);
        console.log('args[1]= '+osc_message.args[1].value);
        if (parseInt(osc_message.args[0].value) == 1) {
            console.log('it\'s master\'s message, play movie');
            if (vp.is_playing == false){


                omx.start('/home/pi/nmh/v-'+video_id+'.mp4');
                vp.is_playing = true;
                console.log('video is playing , vp.is_playing = true');
                udp.send(x, 0, x.length, 9999, master_id);
                console.log('send osc message to master');


                vp.number = vp.number + 1;

                var time = new Date();


                exec('/opt/vc/bin/vcgencmd measure_temp', function(error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });

                console.log('Playing '+vp.number+' times at '+time.toLocaleTimeString());


                var playing_status = 'playing ' + vp.number + ' times at ' + time.toLocaleTimeString();


                fs.writeFile('playing_status.txt', playing_status, (err) => {
                    if (err){
                        throw err;
                    }
                    console.log('playing_status is saved!');
                });
            }
            else {
                console.log('video already playing pass the message')
            }


        }

        if (parseInt(osc_message.args[0].value) == 200 + parseInt(vp.video_id)) {

            console.log('it\'s myself\'s message, movie is end');
            if(vp.is_playing == true){
                vp.is_playing = false;
                console.log('vp.is_playing = false');
                udp.send(x_end, 0, x_end.length, 9999, master_id);
            }
            else{
                console.log('something wrong');
            }

        }

    } catch (err) {
        console.log('Could not decode OSC message');
    }

});




udp.bind(9998);
console.log('Listening for OSC messages on port 9998');
console.log('This Machine is:' + vp.video_id);