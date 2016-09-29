var express	= require("express");
var multer	= require('multer');

var fs = require('fs');
var video_id = fs.readFileSync('/boot/sync_setting.txt', 'utf8');
video_id = video_id.replace(/(\r\n|\n|\r)/gm,"");
video_id = video_id.substring(3, 5);

var app	=	express();
var storage	=	multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '/home/pi/ntmofa/');
    },
    filename: function (req, file, callback) {
        callback(null, 'v-' + video_id +'.mp4');
    }
});
var upload = multer({ storage : storage}).single('userVideo');

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("上傳出錯.");
        }
        res.end("影片上傳完畢");
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});