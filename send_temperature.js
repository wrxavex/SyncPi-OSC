/**
 * Created by znh on 2016/12/3.
 */
// 匯入設定
var VideoPlayer = require('./playing_status');

var osc = require('osc-min'),
    dgram = require('dgram'),
    fs = require('fs'),
    exec = require('child_process').exec,
    remote;

// 指定同步設定檔位置
var video_id = fs.readFileSync('/boot/sync_setting.txt', 'utf8');

// 指定master位置
var master_id = "192.168.1.201";

var vp = new VideoPlayer(video_id);


exec('/opt/vc/bin/vcgencmd measure_temp', function(error, stdout, stderr) {

    var x_poweroff = osc.toBuffer({
        oscType: 'message',
        address: '/omxplayer',
        args: [
            {
                type: 'integer',
                value: parseInt(vp.video_id)
            },
            {
                type: 'integer',
                value: 5
            },
            {
                type: 'string',
                value: stdout
            }
        ]
    });

    udp.send(stdout, 0, stdout.length, 9999, master_id);

    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});