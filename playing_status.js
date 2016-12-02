function VideoPlayer(video_id) {
    this.video_id = video_id;
    this.number = 0;
    this.is_playing = false;
    
}

VideoPlayer.prototype.greet = function() {
    return "Hi, I'm " + this.video_id;
};

VideoPlayer.prototype.count = function() {
    return this.number;
};

VideoPlayer.prototype.temperature = function() {
    exec('/opt/vc/bin/vcgencmd measure_temp', function(error, stdout, stderr) {
        return stdout;
        if (error !== null) {
            return error;
        }
    });
};

VideoPlayer.prototype.play = function() {
    if(this.is_playing == false)
    {
        this.is_playing = true;
        omx.start('/home/pi/ntmofa/v-'+video_id+'.mp4');
        console.log('it\'s time to play');
    }
    else
    {
        console.log(this.video_id + ' is playing');
    }
    
};

VideoPlayer.prototype.quit = function() {
    if(this.is_playing == true)
    {
        this.is_playing = false;
        omx.quit();
        console.log('it\'s time to stop');
    }
    else
    {
        console.log(this.video_id + ' not playing');
    }

};

module.exports = VideoPlayer;  