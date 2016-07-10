var osc = require('osc-min'),
    dgram = require('dgram'),
    remote;
    
var udp = dgram.createSocket("udp4");



var play_count = 0;

var device_status = {};

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
  udp.send(x, 0, x.length, 9998, "192.168.1.213");
  udp.send(x, 0, x.length, 9998, "192.168.1.168");
  udp.send(x, 0, x.length, 9998, "192.168.1.150");


  udp.send(x, 0, x.length, 9998, "192.168.1.231");
  udp.send(x, 0, x.length, 9998, "192.168.1.232");
  udp.send(x, 0, x.length, 9998, "192.168.1.233");
  udp.send(x, 0, x.length, 9998, "192.168.1.234");
  udp.send(x, 0, x.length, 9998, "192.168.1.235");
  udp.send(x, 0, x.length, 9998, "192.168.1.236");
  udp.send(x, 0, x.length, 9998, "192.168.1.237");
  udp.send(x, 0, x.length, 9998, "192.168.1.238");
  udp.send(x, 0, x.length, 9998, "192.168.1.239");





  }, 3000);

}

var omxcallback = dgram.createSocket('udp4', function(msg, rinfo){
  try 
  {
    var time = new Date();
    var osc_message;
    osc_message = osc.fromBuffer(msg);
    if (parseInt(osc_message.args[0].value) == 1) {
      console.log("no.1 callback "+ time.getTime());
        if (parseInt(osc_message.args[1].value) == 1) {
            console.log("no.1 is get master message\n");
            device_status.id_1 = '1';
        }
        if (parseInt(osc_message.args[1].value) == 2) {
            console.log("no.1 movie is end\n");
            device_status.id_1 = '2';
            send();
        }
    }
    if (parseInt(osc_message.args[0].value) == 2) {
      console.log("no.2 callback " + time.getTime());
        if (parseInt(osc_message.args[1].value) == 1) {
            console.log("no.2 is get master message\n");
            device_status.id_2 = '1';
        }
        if (parseInt(osc_message.args[1].value) == 2) {
            console.log("no.2 movie is end\n");
            device_status.id_2 = '2';
        }
    }

    if (parseInt(osc_message.args[0].value) == 3) {
        console.log("no.3 callback " + time.getTime());
        if (parseInt(osc_message.args[1].value) == 1) {
            console.log("no.3 is get master message\n");
            device_status.id_3 = '1';
        }
        if (parseInt(osc_message.args[1].value) == 2) {
            console.log("no.3 movie is end\n");
            device_status.id_3 = '2';
        }
    }



    if (parseInt(osc_message.args[0].value) == 4) {
        console.log("no.4 callback " + time.getTime());
        if (parseInt(osc_message.args[1].value) == 1) {
            console.log("no.4 is get master message\n");
            device_status.id_4 = '1';
        }
        if (parseInt(osc_message.args[1].value) == 2) {
            console.log("no.4 movie is end \n");
            device_status.id_4 = '2';
        }
    }

    if (parseInt(osc_message.args[0].value) == 5) {
      console.log("no.5 callback " + time.getTime());
      if (parseInt(osc_message.args[1].value) == 1) {
          console.log("no.5 is get master message\n");
          device_status.id_5 = '1';
      }
      if (parseInt(osc_message.args[1].value) == 2) {
          console.log("no.5 movie is end \n");
          device_status.id_5 = '2';
      }
    }

    if (parseInt(osc_message.args[0].value) == 6) {
      console.log("no.6 callback " + time.getTime());
      if (parseInt(osc_message.args[1].value) == 1) {
          console.log("no.6 is get master message\n");
          device_status.id_6 = '1';
      }
      if (parseInt(osc_message.args[1].value) == 2) {
          console.log("no.6 movie is end \n");
          device_status.id_6 = '2';
      }
    }

    if (parseInt(osc_message.args[0].value) == 7) {
      console.log("no.7 callback " + time.getTime());
      if (parseInt(osc_message.args[1].value) == 1) {
          console.log("no.7 is get master message\n");
          device_status.id_7 = '1';
      }
      if (parseInt(osc_message.args[1].value) == 2) {
          console.log("no.7 movie is end \n");
          device_status.id_7 = '2';
      }
    }

      if (parseInt(osc_message.args[0].value) == 8) {
          console.log("no.8 callback " + time.getTime());
          if (parseInt(osc_message.args[1].value) == 1) {
              console.log("no.8 is get master message\n");
              device_status.id_8 = '1';
          }
          if (parseInt(osc_message.args[1].value) == 2) {
              console.log("no.8 movie is end \n");
              device_status.id_8 = '2';
          }
      }

      if (parseInt(osc_message.args[0].value) == 9) {
          console.log("no.9 callback " + time.getTime());
          if (parseInt(osc_message.args[1].value) == 1) {
              console.log("no.9 is get master message\n");
              device_status.id_9 = '1';
          }
          if (parseInt(osc_message.args[1].value) == 2) {
              console.log("no.9 movie is end \n");
              device_status.id_9 = '2';
          }
      }
      console.log (device_status);
      console.log ('1:'+ device_status.id_1 +
                    ' 2:' + device_status.id_2 +
                    ' 3:' + device_status.id_3 +
                    ' 4:' + device_status.id_4 +
                    ' 5:' + device_status.id_5 +
                    ' 6:' + device_status.id_6 +
                    ' 7:' + device_status.id_7 +
                    ' 8:' + device_status.id_8 +
                    ' 9:' + device_status.id_9);

  } 
  catch (err) {
    console.log('could not decode OSC message');
  }
});



omxcallback.bind(9999);

// setInterval(send, 4000);

send();
