// 匯入設定
var VideoPlayer = require('./playing_status');

// 匯入 osc 與 omxcontrol
var osc = require('osc-min'),
    dgram = require('dgram'),
    omx = require('omxcontrol'),
    fs = require('fs'),
    exec = require('child_process').exec,
    remote;

// 引入mqtt 建立client物件
var mqtt = require('mqtt'),
    client = mqtt.connect('mqtt://www.znh.tw');

// 指定同步設定檔位置
var video_id = fs.readFileSync('/boot/sync_setting.txt', 'utf8');

// 指定master位置
var master_id = "192.168.1.201";
// 指定目前資料夾
var target = "nmh";

// 轉換文字到id
video_id = video_id.replace(/(\r\n|\n|\r)/gm,"");
video_id = video_id.substring(3, 5);

// 建立video player物件
var vp = new VideoPlayer(video_id);

// 訂閱頻道
client.subscribe('presence');

//
client.publish('presence', vp.is_playing.toString());

client.on('message', function(topic, message) {
    console.log(message.toString());
    if (message.toString() == 'playing') {
        if(vp.is_playing == 0){
            client.publish('presence', '0');
        }
        else {
            client.publish('presence', '1');
        }
    }

    //client.publish('presence', vp.is_playing.toString());
});




// listen for OSC messages and print them to the console
var udp = dgram.createSocket('udp4', function(msg, rinfo) {
    var osc_message;

    // 宣告 x 變數 - 發 osc message 用的
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
    // 宣告 x_end 變數 - 播放完畢時回call master時發送
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

    var x_rebooting = osc.toBuffer({
        oscType: 'message',
        address: '/omxplayer',
        args: [
            {
                type: 'integer',
                value: parseInt(vp.video_id)
            },
            {
                type: 'integer',
                value: 3
            }
        ]
    });

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
                value: 4
            }
        ]
    });

    var x_temperature = osc.toBuffer({
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
                value: vp.temperature
            }
        ]
    });





    // save the remote address
    remote = rinfo.address;
    try {

        osc_message = osc.fromBuffer(msg);

        // 判斷從 9998 過來的osc message
        console.log('args[0]= '+osc_message.args[0].value);
        console.log('args[1]= '+osc_message.args[1].value);

        // 假如是master訊息
        if (parseInt(osc_message.args[0].value) == 1) {
            console.log('it\'s master\'s message, play movie');


            if (parseInt(osc_message.args[1].value) == 3) {
                console.log("master send reboot message\n");
                udp.send(x_rebooting, 0, x_rebooting.length, 9999, master_id);

                exec('sudo reboot', function (error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });
            }

            if (parseInt(osc_message.args[1].value) == 4) {
                console.log("master send power off message\n");
                udp.send(x_poweroff, 0, x_poweroff.length, 9999, master_id);

                exec('sudo poweroff', function (error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });
            }

            if (parseInt(osc_message.args[1].value) == 6) {
                console.log("master send check message\n");
                udp.send(x_temperature, 0, x_temperature.length, 9999, master_id);

            }



            // 假如沒在播放狀態
            if (vp.is_playing == false){

                // 呼叫 omxcontrol 播放影片
                omx.start('/home/pi/'+target+'/v-'+video_id+'.mp4');

                // 設為播放中
                vp.is_playing = true;
                console.log('video is playing , vp.is_playing = true');
                udp.send(x, 0, x.length, 9999, master_id);

                console.log('send osc message to master');



                // 播放次數加一
                vp.number = vp.number + 1;


                // set slave tft display status
                var slave_play_status = osc.toBuffer({
                    oscType: 'message',
                    address: '/omxplayer',
                    args: [
                        {
                            type: 'integer',
                            value: 10
                        },
                        {
                            type: 'integer',
                            value: parseInt(vp.number)
                        }
                    ]
                });

                var slave_play_count = osc.toBuffer({
                    oscType: 'message',
                    address: '/omxplayer',
                    args: [
                        {
                            type: 'integer',
                            value: parseInt(vp.video_id)
                        },
                        {
                            type: 'integer',
                            value: 6
                        },
                        {
                            type: 'integer',
                            value: parseInt(vp.number)
                        }
                    ]
                });

                // send osc message to slave tft display status
                udp.send(slave_play_count, 0, slave_play_count.length, 9999, master_id);

                // 取得現在時間
                var time = new Date();

                // 取得cpu溫度
                exec('/opt/vc/bin/vcgencmd measure_temp', function(error, stdout, stderr) {
                    vp.temperature = stdout;
                    var x_temperature = osc.toBuffer({
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
                    udp.send(x_temperature, 0, x_temperature.length, 9999, master_id);
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });

                // 顯示播放次數和時間
                console.log('Playing '+vp.number+' times at '+time.toLocaleTimeString());

                // 設定變數
                var playing_status = 'playing ' + vp.number + ' times at ' + time.toLocaleTimeString();

                // 寫入 playing_status
                fs.writeFile('playing_status.txt', playing_status, (err) => {
                    if (err){
                        throw err;
                    }
                    console.log('playing_status is saved!');
                });
            }

            // 播放中的話就忽略訊息
            else {
                console.log('video already playing pass the message')


            }


        }

        // 如果message的第一個參數加200符合ip 執行以下動作
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
    // message錯誤的話 顯示訊息
    } catch (err) {
        console.log('Could not decode OSC message');
    }

});




udp.bind(9998);
console.log('Listening for OSC messages on port 9998');
console.log('This Machine is:' + vp.video_id);

var x_waiting = osc.toBuffer({
        oscType: 'message',
        address: '/omxplayer',
        args: [
            {
                type: 'integer',
                value: parseInt(vp.video_id)
            },
            {
                type: 'integer',
                value: 0
            }
        ]
    });

udp.send(x_waiting, 0, x_waiting.length, 9999, master_id);
console.log('send waiting');