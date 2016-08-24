import subprocess

class DisplayStatus():

    def __init__(self):

        self.id = '1'
        # default ID is 1

        self.video_name = 'video1.mp4'
        # default Video Name is video1.mp4

        self.status = 0
        # status = 0 => main info
        # status = 1 => player mode info
        # status = 2 => video file sync mode

        self.btnevent = 0
        # 1 is button1 event
        # 2 is button2 event
        # 3 is button3 event
        # 4 is button4 event

        self.btnsubmit = 0

        self.option = 0
        # if option 0 is selected option = 1
        # if option 1 is selected option = 2
        # if option 2 is selected option = 3

        self.help_mode = 0
        # if hlep_mode = 1 than display help info

        self.player_mode = 0
        # player_mode = 0 => Standalone
        # player_mode = 1 => Master
        # player_mode = 2 => Slave

        self.have_new_video = 0
        # have_new_video = 0 => no New Video
        # have_new_video = 1 => have new Video

    def get_cpu_temperaure(self):

        cpu_temp_raw_data = subprocess.check_output(["/opt/vc/bin/vcgencmd", "measure_temp"])
        cpu_temp = cpu_temp_raw_data.strip()

        return cpu_temp

    def get_player_mode(self):
        if self.player_mode == 0:
            return u'獨立播放模式'
        elif self.player_mode == 1:
            return u'同步播放主機'
        elif self.player_mode == 2:
            return u'同步播放從機'
