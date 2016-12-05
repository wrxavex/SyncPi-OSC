var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var async = require('async');

var mqtt = require('mqtt'),
    client = mqtt.connect('mqtt://www.znh.tw');


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(8080, '0.0.0.0',  function(){
    console.log('HTTP Server: http://127.0.0.1:8080/');
});

io.on('connection', function(socket){
    console.log ('connection');

    var check_message = osc.toBuffer({
        oscType: 'message',
        address: '/omxplayer',
        args: [
            {
                type: 'integer',
                value: 1
            },
            {
                type: 'integer',
                value: 6
            }
        ]
    });

    var reboot_message = osc.toBuffer({
        oscType: 'message',
        address: '/omxplayer',
        args: [
            {
                type: 'integer',
                value: 1
            },
            {
                type: 'integer',
                value: 3
            }
        ]
    });

    var power_off_message = osc.toBuffer({
        oscType: 'message',
        address: '/omxplayer',
        args: [
            {
                type: 'integer',
                value: 1
            },
            {
                type: 'integer',
                value: 4
            }
        ]
    });

    socket.on('device_control', function(msg){
        console.log('回傳控制碼: ' + msg);
        if (msg == 'switch_1'){
            console.log('switch 1');
            udp.send(reboot_message, 0, reboot_message.length, 9998, "192.168.1.201");
        }
        if (msg == 'switch_2'){
            console.log('switch 2');
            udp.send(reboot_message, 0, reboot_message.length, 9998, "192.168.1.202");
        }
        if (msg == 'switch_3'){
            console.log('switch 3');
            udp.send(reboot_message, 0, reboot_message.length, 9998, "192.168.1.203");
        }
        if (msg == 'switch_4'){
            console.log('switch 4');
            udp.send(reboot_message, 0, reboot_message.length, 9998, "192.168.1.204");
        }
        if (msg == 'switch_5'){
            console.log('switch 5');
            udp.send(reboot_message, 0, reboot_message.length, 9998, "192.168.1.205");
        }
        if (msg == 'switch_6'){
            console.log('switch 6');
            udp.send(reboot_message, 0, reboot_message.length, 9998, "192.168.1.206");
        }
        if (msg == 'switch_7'){
            console.log('switch 7');
            udp.send(reboot_message, 0, reboot_message.length, 9998, "192.168.1.207");
        }
        if (msg == 'switch_8'){
            console.log('switch 8');
            udp.send(reboot_message, 0, reboot_message.length, 9998, "192.168.1.208");
        }
        if (msg == 'switch_9'){
            console.log('switch 9');
            udp.send(reboot_message, 0, reboot_message.length, 9998, "192.168.1.209");
        }
        if (msg == 'switch_10'){
            console.log('switch 10');
            udp.send(reboot_message, 0, reboot_message.length, 9998, "192.168.1.210");
        }
        if (msg == 'switch_11'){
            console.log('switch 11');
            udp.send(reboot_message, 0, reboot_message.length, 9998, "192.168.1.211");
        }
        if (msg == 'switch_12'){
            console.log('switch 12');
            udp.send(reboot_message, 0, reboot_message.length, 9998, "192.168.1.212");
        }
        if (msg == 'power_off_1'){
            console.log('power_off_1');
            udp.send(power_off_message, 0, power_off_message.length, 9998, "192.168.1.201");
        }
        if (msg == 'power_off_2'){
            console.log('power_off_2');
            udp.send(power_off_message, 0, power_off_message.length, 9998, "192.168.1.202");
        }
        if (msg == 'power_off_3'){
            console.log('power_off_3');
            udp.send(power_off_message, 0, power_off_message.length, 9998, "192.168.1.203");
        }
        if (msg == 'power_off_4'){
            console.log('power_off_4');
            udp.send(power_off_message, 0, power_off_message.length, 9998, "192.168.1.204");
        }
        if (msg == 'power_off_5'){
            console.log('power_off_5');
            udp.send(power_off_message, 0, power_off_message.length, 9998, "192.168.1.205");
        }
        if (msg == 'power_off_6'){
            console.log('power_off_6');
            udp.send(power_off_message, 0, power_off_message.length, 9998, "192.168.1.206");
        }
        if (msg == 'power_off_7'){
            console.log('power_off_7');
            udp.send(power_off_message, 0, power_off_message.length, 9998, "192.168.1.207");
        }
        if (msg == 'power_off_8'){
            console.log('power_off_8');
            udp.send(power_off_message, 0, power_off_message.length, 9998, "192.168.1.208");
        }
        if (msg == 'power_off_9'){
            console.log('power_off_9');
            udp.send(power_off_message, 0, power_off_message.length, 9998, "192.168.1.209");
        }
        if (msg == 'power_off_10'){
            console.log('power_off_10');
            udp.send(power_off_message, 0, power_off_message.length, 9998, "192.168.1.210");
        }
        if (msg == 'power_off_11'){
            console.log('power_off_11');
            udp.send(power_off_message, 0, power_off_message.length, 9998, "192.168.1.211");
        }
        if (msg == 'power_off_12'){
            console.log('power_off_12');
            udp.send(power_off_message, 0, power_off_message.length, 9998, "192.168.1.212");
        }
        if (msg == 'check_devices'){
            console.log('check devices status');
            udp.send(check_message, 0, check_message.length, 9998, "192.168.1.201");
            udp.send(check_message, 0, check_message.length, 9998, "192.168.1.202");
            udp.send(check_message, 0, check_message.length, 9998, "192.168.1.203");
            udp.send(check_message, 0, check_message.length, 9998, "192.168.1.204");
            udp.send(check_message, 0, check_message.length, 9998, "192.168.1.205");
            udp.send(check_message, 0, check_message.length, 9998, "192.168.1.206");
            udp.send(check_message, 0, check_message.length, 9998, "192.168.1.207");
            udp.send(check_message, 0, check_message.length, 9998, "192.168.1.208");
            udp.send(check_message, 0, check_message.length, 9998, "192.168.1.209");
            udp.send(check_message, 0, check_message.length, 9998, "192.168.1.210");
            udp.send(check_message, 0, check_message.length, 9998, "192.168.1.211");
            udp.send(check_message, 0, check_message.length, 9998, "192.168.1.212");
        }



    });
});

// 引入 osc-min dgram fs
var osc = require('osc-min'),
    dgram = require('dgram'),
    fs = require('fs');

// 建立udp
var udp = dgram.createSocket("udp4");

// 讀入sync_setting
var video_id = fs.readFileSync('/boot/sync_setting.txt', 'utf8');

// 處理video_id
video_id = video_id.substring(3, 5);
video_id = parseInt(video_id);

// 播次計數？
var play_count = 0;

// 設定延時秒數（ms）
delay_time = 3000;

// 裝置狀態陣列
var device_status = {};

// 送給大家的函式
function send() {

    // 宣告用於message的x參數內容
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



    // 播放次數加一
    play_count = play_count + 1;

    // 取得時間
    var time = new Date();

    // 顯示資訊
    console.log('Playing '+play_count+' times at '+time.toLocaleTimeString());

    // 延時後send udp
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


        udp.send(x, 0, x.length, 9998, "192.168.1.231");
        udp.send(x, 0, x.length, 9998, "192.168.1.232");
        udp.send(x, 0, x.length, 9998, "192.168.1.233");
        udp.send(x, 0, x.length, 9998, "192.168.1.234");
        udp.send(x, 0, x.length, 9998, "192.168.1.235");
        udp.send(x, 0, x.length, 9998, "192.168.1.236");
        udp.send(x, 0, x.length, 9998, "192.168.1.237");
        udp.send(x, 0, x.length, 9998, "192.168.1.238");
        udp.send(x, 0, x.length, 9998, "192.168.1.239");

        udp.send(x, 0, x.length, 9998, "192.168.1.139");

    }, delay_time);
}

// 收到omxcallback的處理
var omxcallback;
omxcallback = dgram.createSocket('udp4', function (msg, rinfo) {
    try {

        console.log('========= start ===========');

        // 取得時間
        var time = new Date();

        // 取得osc_message
        var osc_message;
        osc_message = osc.fromBuffer(msg);

        // 顯示訊息內容
        console.log("catch callback" + osc_message.args[0] + " value:" + osc_message.args[1]);

        // 如果第一個參數是1
        if (parseInt(osc_message.args[0].value) == 1) {
            console.log("no.1 callback " + time.getTime());
            device_status.id_1_lasttime = time.getTime();
            if (parseInt(osc_message.args[1].value) == 0) {
                console.log("no.1 is waiting\n");
                device_status.id_1 = '0';
                io.emit('device_1', 'waiting');
                client.publish('nmh/1', 'waiting');
            }
            if (parseInt(osc_message.args[1].value) == 1) {
                console.log("no.1 is playing\n");
                device_status.id_1 = '1';
                io.emit('device_1', 'on');
                client.publish('nmh/1', 'playing');

            }
            if (parseInt(osc_message.args[1].value) == 2) {
                console.log("no.1 movie is end\n");
                device_status.id_1 = '2';
                io.emit('device_1', 'off');
                client.publish('nmh/1', 'off');
                send();
            }
            if (parseInt(osc_message.args[1].value) == 3) {
                console.log("no.1 rebooting\n");
                device_status.id_1 = '3';
                io.emit('device_1', 'rebooting');
                client.publish('nmh/1', 'rebooting');
            }
            if (parseInt(osc_message.args[1].value) == 4) {
                console.log("no.1 power off\n");
                device_status.id_1 = '4';
                io.emit('device_1', 'power_off');
                client.publish('nmh/1', 'poweroff');
            }
            if (parseInt(osc_message.args[1].value) == 5) {
                console.log("no.1 sended temperature\n");
                console.log(osc_message.args[2].value);
                io.emit('device_1_temperature', osc_message.args[2].value);
                client.publish('nmh/1/temperature',String(osc_message.args[2].value));
            }
            if (parseInt(osc_message.args[1].value) == 6) {
                console.log("no.1 sended played count\n");
                console.log(osc_message.args[2].value);
                io.emit('device_1_played_count', osc_message.args[2].value);
                client.publish('nmh/1/count', String(osc_message.args[2].value));
            }
        }

        // 如果第一個參數是2
        if (parseInt(osc_message.args[0].value) == 2) {
            console.log("no.2 callback " + time.getTime());
            device_status.id_2_lasttime = time.getTime();
            if (parseInt(osc_message.args[1].value) == 0) {
                console.log("no.2 is waiting\n");
                device_status.id_2 = '0';
                io.emit('device_2', 'waiting');
                client.publish('nmh/2', 'waiting');
            }
            if (parseInt(osc_message.args[1].value) == 1) {
                console.log("no.2 is playing\n");
                device_status.id_2 = '1';
                io.emit('device_2', 'on');
                client.publish('nmh/2', 'playing');
            }
            if (parseInt(osc_message.args[1].value) == 2) {
                console.log("no.2 movie is end\n");
                device_status.id_2 = '2';
                io.emit('device_2', 'off');
                client.publish('nmh/2', 'off');
            }
            if (parseInt(osc_message.args[1].value) == 3) {
                console.log("no.2 rebooting\n");
                device_status.id_2 = '3';
                io.emit('device_2', 'rebooting');
                client.publish('nmh/2', 'rebooting');
            }
            if (parseInt(osc_message.args[1].value) == 4) {
                console.log("no.2 power off\n");
                device_status.id_2 = '4';
                io.emit('device_2', 'power_off');
                client.publish('nmh/2', 'power off');
            }
            if (parseInt(osc_message.args[1].value) == 5) {
                console.log("no.2 sended temperature\n");
                console.log(osc_message.args[2].value);
                io.emit('device_2_temperature', osc_message.args[2].value);
                client.publish('nmh/2/temperature', String(osc_message.args[2].value));
            }
            if (parseInt(osc_message.args[1].value) == 6) {
                console.log("no.2 sended played count\n");
                console.log(osc_message.args[2].value);
                io.emit('device_2_played_count', osc_message.args[2].value);
                client.publish('nmh/2/count', String(osc_message.args[2].value));

            }

        }

        // 如果第一個參數是3
        if (parseInt(osc_message.args[0].value) == 3) {
            console.log("no.3 callback " + time.getTime());
            device_status.id_3_lasttime = time.getTime();
            if (parseInt(osc_message.args[1].value) == 0) {
                console.log("no.3 is waiting\n");
                device_status.id_3 = '0';
                io.emit('device_3', 'waiting');
                client.publish('nmh/3', 'waiting');

            }
            if (parseInt(osc_message.args[1].value) == 1) {
                console.log("no.3 is playing\n");
                device_status.id_3 = '1';
                io.emit('device_3', 'on');
                client.publish('nmh/3', 'playing');
            }
            if (parseInt(osc_message.args[1].value) == 2) {
                console.log("no.3 movie is end\n");
                device_status.id_3 = '2';
                io.emit('device_3', 'off');
                client.publish('nmh/3', 'off');
            }
            if (parseInt(osc_message.args[1].value) == 3) {
                console.log("no.3 rebooting\n");
                device_status.id_3 = '3';
                io.emit('device_3', 'rebooting');
                client.publish('nmh/3', 'rebooting');
            }
            if (parseInt(osc_message.args[1].value) == 4) {
                console.log("no.3 power off\n");
                device_status.id_3 = '4';
                io.emit('device_3', 'power_off');
                client.publish('nmh/3', 'power off');
            }
            if (parseInt(osc_message.args[1].value) == 5) {
                console.log("no.3 sended temperature\n");
                console.log(osc_message.args[2].value);
                io.emit('device_3_temperature', osc_message.args[2].value);
                client.publish('nmh/3/temperature', String(osc_message.args[2].value));
            }
            if (parseInt(osc_message.args[1].value) == 6) {
                console.log("no.3 sended played count\n");
                console.log(osc_message.args[2].value);
                io.emit('device_3_played_count', osc_message.args[2].value);
                client.publish('nmh/3/count', String(osc_message.args[2].value));
            }
        }

        // 如果第一個參數是4
        if (parseInt(osc_message.args[0].value) == 4) {
            console.log("no.4 callback " + time.getTime());
            device_status.id_4_lasttime = time.getTime();
            if (parseInt(osc_message.args[1].value) == 0) {
                console.log("no.4 is get master message\n");
                device_status.id_4 = '0';
                io.emit('device_4', 'waiting');
            }
            if (parseInt(osc_message.args[1].value) == 1) {
                console.log("no.4 is get master message\n");
                device_status.id_4 = '1';
                io.emit('device_4', 'on');
            }
            if (parseInt(osc_message.args[1].value) == 2) {
                console.log("no.4 movie is end\n");
                device_status.id_4 = '2';
                io.emit('device_4', 'off');
            }
            if (parseInt(osc_message.args[1].value) == 3) {
                console.log("no.4 rebooting\n");
                device_status.id_4 = '3';
                io.emit('device_4', 'rebooting');
            }
            if (parseInt(osc_message.args[1].value) == 4) {
                console.log("no.4 power off\n");
                device_status.id_4 = '4';
                io.emit('device_4', 'power_off');
            }
            if (parseInt(osc_message.args[1].value) == 5) {
                console.log("no.4 sended temperature\n");
                console.log(osc_message.args[2].value);
                io.emit('device_4_temperature', osc_message.args[2].value);
            }
            if (parseInt(osc_message.args[1].value) == 6) {
                console.log("no.4 sended played count\n");
                console.log(osc_message.args[2].value);
                io.emit('device_4_played_count', osc_message.args[2].value);
            }

        }

        // 如果第一個參數是5
        if (parseInt(osc_message.args[0].value) == 5) {
            console.log("no.5 callback " + time.getTime());
            device_status.id_5_lasttime = time.getTime();
            if (parseInt(osc_message.args[1].value) == 0) {
                console.log("no.5 is get master message\n");
                device_status.id_5 = '0';
                io.emit('device_5', 'waiting');
            }
            if (parseInt(osc_message.args[1].value) == 1) {
                console.log("no.5 is get master message\n");
                device_status.id_5 = '1';
                io.emit('device_5', 'on');
            }
            if (parseInt(osc_message.args[1].value) == 2) {
                console.log("no.5 movie is end\n");
                device_status.id_5 = '2';
                io.emit('device_5', 'off');
            }
            if (parseInt(osc_message.args[1].value) == 3) {
                console.log("no.5 rebooting\n");
                device_status.id_5 = '3';
                io.emit('device_5', 'rebooting');
            }
            if (parseInt(osc_message.args[1].value) == 4) {
                console.log("no.5 power off\n");
                device_status.id_5 = '4';
                io.emit('device_5', 'power_off');
            }
            if (parseInt(osc_message.args[1].value) == 5) {
                console.log("no.6 sended temperature\n");
                console.log(osc_message.args[2].value);
                io.emit('device_6_temperature', osc_message.args[2].value);
            }
            if (parseInt(osc_message.args[1].value) == 6) {
                console.log("no.6 sended played count\n");
                console.log(osc_message.args[2].value);
                io.emit('device_6_played_count', osc_message.args[2].value);
            }
        }

        // 如果第一個參數是6
        if (parseInt(osc_message.args[0].value) == 6) {
            console.log("no.6 callback " + time.getTime());
            device_status.id_6_lasttime = time.getTime();
            if (parseInt(osc_message.args[1].value) == 0) {
                console.log("no.6 is get master message\n");
                device_status.id_6 = '0';
                io.emit('device_6', 'waiting');
            }
            if (parseInt(osc_message.args[1].value) == 1) {
                console.log("no.6 is get master message\n");
                device_status.id_6 = '1';
                io.emit('device_6', 'on');
            }
            if (parseInt(osc_message.args[1].value) == 2) {
                console.log("no.6 movie is end\n");
                device_status.id_6 = '2';
                io.emit('device_6', 'off');
            }
            if (parseInt(osc_message.args[1].value) == 3) {
                console.log("no.6 rebooting\n");
                device_status.id_6 = '3';
                io.emit('device_6', 'rebooting');
            }
            if (parseInt(osc_message.args[1].value) == 4) {
                console.log("no.6 power off\n");
                device_status.id_6 = '4';
                io.emit('device_6', 'power_off');
            }
            if (parseInt(osc_message.args[1].value) == 5) {
                console.log("no.6 sended temperature\n");
                console.log(osc_message.args[2].value);
                io.emit('device_6_temperature', osc_message.args[2].value);
            }
            if (parseInt(osc_message.args[1].value) == 6) {
                console.log("no.6 sended played count\n");
                console.log(osc_message.args[2].value);
                io.emit('device_6_played_count', osc_message.args[2].value);
            }
        }

        // 如果第一個參數是7
        if (parseInt(osc_message.args[0].value) == 7) {
            console.log("no.7 callback " + time.getTime());
            device_status.id_7_lasttime = time.getTime();
            if (parseInt(osc_message.args[1].value) == 0) {
                console.log("no.7 is get master message\n");
                device_status.id_7 = '0';
                io.emit('device_7', 'waiting');
            }
            if (parseInt(osc_message.args[1].value) == 1) {
                console.log("no.7 is get master message\n");
                device_status.id_7 = '1';
                io.emit('device_7', 'on');
            }
            if (parseInt(osc_message.args[1].value) == 2) {
                console.log("no.7 movie is end\n");
                device_status.id_7 = '2';
                io.emit('device_7', 'off');
            }
            if (parseInt(osc_message.args[1].value) == 3) {
                console.log("no.7 rebooting\n");
                device_status.id_7 = '3';
                io.emit('device_7', 'rebooting');
            }
            if (parseInt(osc_message.args[1].value) == 4) {
                console.log("no.7 power off\n");
                device_status.id_7 = '4';
                io.emit('device_7', 'power_off');
            }
            if (parseInt(osc_message.args[1].value) == 5) {
                console.log("no.7 sended temperature\n");
                console.log(osc_message.args[2].value);
                io.emit('device_7_temperature', osc_message.args[2].value);
            }
            if (parseInt(osc_message.args[1].value) == 6) {
                console.log("no.7 sended played count\n");
                console.log(osc_message.args[2].value);
                io.emit('device_7_played_count', osc_message.args[2].value);
            }
        }

        if (parseInt(osc_message.args[0].value) == 8) {
            console.log("no.8 callback " + time.getTime());
            device_status.id_8_lasttime = time.getTime();
            if (parseInt(osc_message.args[1].value) == 0) {
                console.log("no.8 is get master message\n");
                device_status.id_8 = '0';
                io.emit('device_8', 'waiting');
            }
            if (parseInt(osc_message.args[1].value) == 1) {
                console.log("no.8 is get master message\n");
                device_status.id_8 = '1';
                io.emit('device_8', 'on');
            }
            if (parseInt(osc_message.args[1].value) == 2) {
                console.log("no.8 movie is end\n");
                device_status.id_8 = '2';
                io.emit('device_8', 'off');
            }
            if (parseInt(osc_message.args[1].value) == 3) {
                console.log("no.8 rebooting\n");
                device_status.id_8 = '3';
                io.emit('device_8', 'rebooting');
            }
            if (parseInt(osc_message.args[1].value) == 4) {
                console.log("no.8 power off\n");
                device_status.id_8 = '4';
                io.emit('device_8', 'power_off');
            }
            if (parseInt(osc_message.args[1].value) == 5) {
                console.log("no.8 sended temperature\n");
                console.log(osc_message.args[2].value);
                io.emit('device_8_temperature', osc_message.args[2].value);
            }
            if (parseInt(osc_message.args[1].value) == 6) {
                console.log("no.8 sended played count\n");
                console.log(osc_message.args[2].value);
                io.emit('device_8_played_count', osc_message.args[2].value);
            }
        }

        if (parseInt(osc_message.args[0].value) == 9) {
            console.log("no.9 callback " + time.getTime());
            device_status.id_9_lasttime = time.getTime();
            if (parseInt(osc_message.args[1].value) == 0) {
                console.log("no.9 is get master message\n");
                device_status.id_9 = '0';
                io.emit('device_9', 'waiting');
            }
            if (parseInt(osc_message.args[1].value) == 1) {
                console.log("no.9 is get master message\n");
                device_status.id_9 = '1';
                io.emit('device_9', 'on');
            }
            if (parseInt(osc_message.args[1].value) == 2) {
                console.log("no.9 movie is end\n");
                device_status.id_9 = '2';
                io.emit('device_9', 'off');
            }
            if (parseInt(osc_message.args[1].value) == 3) {
                console.log("no.9 rebooting\n");
                device_status.id_9 = '3';
                io.emit('device_9', 'rebooting');
            }
            if (parseInt(osc_message.args[1].value) == 4) {
                console.log("no.9 power off\n");
                device_status.id_9 = '4';
                io.emit('device_9', 'power_off');
            }
            if (parseInt(osc_message.args[1].value) == 5) {
                console.log("no.9 sended temperature\n");
                console.log(osc_message.args[2].value);
                io.emit('device_9_temperature', osc_message.args[2].value);
            }
            if (parseInt(osc_message.args[1].value) == 6) {
                console.log("no.9 sended played count\n");
                console.log(osc_message.args[2].value);
                io.emit('device_9_played_count', osc_message.args[2].value);
            }
        }

        if (parseInt(osc_message.args[0].value) == 10) {
            console.log("no.10 callback " + time.getTime());
            device_status.id_10_lasttime = time.getTime();
            if (parseInt(osc_message.args[1].value) == 0) {
                console.log("no.10 is get master message\n");
                device_status.id_10 = '0';
                io.emit('device_10', 'waiting');
            }
            if (parseInt(osc_message.args[1].value) == 1) {
                console.log("no.10 is get master message\n");
                device_status.id_10 = '1';
                io.emit('device_10', 'on');
            }
            if (parseInt(osc_message.args[1].value) == 2) {
                console.log("no.10 movie is end\n");
                device_status.id_10 = '2';
                io.emit('device_10', 'off');
            }
            if (parseInt(osc_message.args[1].value) == 3) {
                console.log("no.10 rebooting\n");
                device_status.id_10 = '3';
                io.emit('device_10', 'rebooting');
            }
            if (parseInt(osc_message.args[1].value) == 4) {
                console.log("no.10 power off\n");
                device_status.id_10 = '4';
                io.emit('device_10', 'power_off');
            }
            if (parseInt(osc_message.args[1].value) == 5) {
                console.log("no.10 sended temperature\n");
                console.log(osc_message.args[2].value);
                io.emit('device_10_temperature', osc_message.args[2].value);
            }
            if (parseInt(osc_message.args[1].value) == 6) {
                console.log("no.10 sended played count\n");
                console.log(osc_message.args[2].value);
                io.emit('device_10_played_count', osc_message.args[2].value);
            }
        }

        if (parseInt(osc_message.args[0].value) == 11) {
            console.log("no.11 callback " + time.getTime());
            device_status.id_11_lasttime = time.getTime();
            if (parseInt(osc_message.args[1].value) == 0) {
                console.log("no.11 is get master message\n");
                device_status.id_11 = '0';
                io.emit('device_11', 'waiting');
            }
            if (parseInt(osc_message.args[1].value) == 1) {
                console.log("no.11 is get master message\n");
                device_status.id_11 = '1';
                io.emit('device_11', 'on');
            }
            if (parseInt(osc_message.args[1].value) == 2) {
                console.log("no.11 movie is end\n");
                device_status.id_11 = '2';
                io.emit('device_11', 'off');
            }
            if (parseInt(osc_message.args[1].value) == 3) {
                console.log("no.11 rebooting\n");
                device_status.id_11 = '3';
                io.emit('device_11', 'rebooting');
            }
            if (parseInt(osc_message.args[1].value) == 4) {
                console.log("no.11 power off\n");
                device_status.id_11 = '4';
                io.emit('device_11', 'power_off');
            }
            if (parseInt(osc_message.args[1].value) == 5) {
                console.log("no.11 sended temperature\n");
                console.log(osc_message.args[2].value);
                io.emit('device_11_temperature', osc_message.args[2].value);
            }
            if (parseInt(osc_message.args[1].value) == 6) {
                console.log("no.11 sended played count\n");
                console.log(osc_message.args[2].value);
                io.emit('device_11_played_count', osc_message.args[2].value);
            }
        }


        if (parseInt(osc_message.args[0].value) == 12) {
            console.log("no.12 callback " + time.getTime());
            device_status.id_12_lasttime = time.getTime();
            if (parseInt(osc_message.args[1].value) == 0) {
                console.log("no.12 is get master message\n");
                device_status.id_12 = '0';
                io.emit('device_12', 'waiting');
            }
            if (parseInt(osc_message.args[1].value) == 1) {
                console.log("no.12 is get master message\n");
                device_status.id_12 = '1';
                io.emit('device_12', 'on');
            }
            if (parseInt(osc_message.args[1].value) == 2) {
                console.log("no.12 movie is end\n");
                device_status.id_12 = '2';
                io.emit('device_12', 'off');
            }
            if (parseInt(osc_message.args[1].value) == 3) {
                console.log("no.12 rebooting\n");
                device_status.id_12 = '3';
                io.emit('device_12', 'rebooting');
            }
            if (parseInt(osc_message.args[1].value) == 4) {
                console.log("no.12 power off\n");
                device_status.id_12 = '4';
                io.emit('device_12', 'power_off');
            }
            if (parseInt(osc_message.args[1].value) == 5) {
                console.log("no.12 sended temperature\n");
                console.log(osc_message.args[2].value);
                io.emit('device_12_temperature', osc_message.args[2].value);
            }
            if (parseInt(osc_message.args[1].value) == 6) {
                console.log("no.12 sended played count\n");
                console.log(osc_message.args[2].value);
                io.emit('device_12_played_count', osc_message.args[2].value);
            }
        }

        // 印出裝置狀態
        // console.log(device_status);

        // 分別印出裝置狀態
        // console.log('1:' + device_status.id_1 +
        //     ' 2:' + device_status.id_2 +
        //     ' 3:' + device_status.id_3 +
        //     ' 4:' + device_status.id_4 +
        //     ' 5:' + device_status.id_5 +
        //     ' 6:' + device_status.id_6 +
        //     ' 7:' + device_status.id_7 +
        //     ' 8:' + device_status.id_8 +
        //     ' 9:' + device_status.id_9 +
        //     '10:' + device_status.id_10 +
        //     '11:' + device_status.id_11 +
        //     '12:' + device_status.id_12);

        // 設定送給tftdisplay的訊息
        // var message_to_TFT = osc.toBuffer({
        //     oscType: 'message',
        //     address: '/omxplayer',
        //     args: [
        //         {
        //             type: 'integer',
        //             value: 1
        //         },
        //         {
        //             type: 'integer',
        //             value: 3
        //         },
        //         {
        //           type: 'integer',
        //             value: parseInt(play_count)
        //         },
        //         {
        //             type: 'integer',
        //             value: parseInt(device_status.id_1)
        //         },
        //         {
        //             type: 'integer',
        //             value: parseInt(device_status.id_2)
        //         },
        //         {
        //             type: 'integer',
        //             value: parseInt(device_status.id_3)
        //         },
        //         {
        //             type: 'integer',
        //             value: parseInt(device_status.id_4)
        //         },
        //         {
        //             type: 'integer',
        //             value: parseInt(device_status.id_5)
        //         },
        //         {
        //             type: 'integer',
        //             value: parseInt(device_status.id_6)
        //         },
        //         {
        //             type: 'integer',
        //             value: parseInt(device_status.id_7)
        //         },
        //         {
        //             type: 'integer',
        //             value: parseInt(device_status.id_8)
        //         },
        //         {
        //             type: 'integer',
        //             value: parseInt(device_status.id_9)
        //         },
        //         {
        //             type: 'integer',
        //             value: parseInt(device_status.id_10)
        //         },
        //         {
        //             type: 'integer',
        //             value: parseInt(device_status.id_11)
        //         },
        //         {
        //             type: 'integer',
        //             value: parseInt(device_status.id_12)
        //         },
        //
        //     ]
        // });

        // 送出訊息（port 9997)
        // udp.send(message_to_TFT, 0, message_to_TFT.length, 9997, "192.168.1.139");
        // udp.send(message_to_TFT, 0, message_to_TFT.length, 9997, "127.0.0.1");
        // console.log('tft message send')

        console.log('========= over ===========\n\n');

    }

    // 發生錯誤的話印出
    catch(err)
    {
        console.log('could not decode OSC message');
    }
});

// 印出id
console.log ("my id is " + video_id);

// 如果是主機才執行
if (video_id == 1) {
    console.log('I am master start server');
    omxcallback.bind(9999);
    send();
}
else {
    console.log('Not Master')
}

