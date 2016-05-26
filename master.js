var osc = require('osc-min'),
    dgram = require('dgram'),
    remote;
    
sock = udp.createSocket("udp4", function(msg, rinfo) {
  var error, error1, redirected;
  try {
    redirected = osc.applyAddressTransform(msg, function(address) {
      return "/redirect" + address;
    });
    return sock.send(redirected, 0, redirected.length, outport, "localhost");
  } catch (error1) {
    error = error1;
    return console.log("error redirecting: " + error);
  }
});

sock.bind(inport);

function send() {
  var x = osc.toBuffer({
    oscType: 'message',
    address: '/omxplayer',
    args: [{
      type: 'integer',
      value: 1
    }]
  });
  udp.send(x, 0, x.length, 9998, "192.168.1.189");
  udp.send(x, 0, x.length, 9998, "192.168.1.159");
  udp.send(x, 0, x.length, 9998, "192.168.1.160");
}
send();
