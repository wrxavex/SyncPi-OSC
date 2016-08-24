#!/usr/bin/env python
# -*- coding: utf-8 -*-
import subprocess
import os

def read_sync_setting(filename):
    f = open(filename, 'r+w')
    return f.read().split()

player_setting = read_sync_setting('/boot/Sync_Setting.txt')

if 'ID=1' in player_setting:
    usb_video_file = 'video1.mp4'
    sync_id = 1
if 'ID=2' in player_setting:
    usb_video_file = 'video2.mp4'
    sync_id = 2
if 'ID=3' in player_setting:
    usb_video_file = 'video3.mp4'
    sync_id = 3
if 'ID=4' in player_setting:
    usb_video_file = 'video4.mp4'
    sync_id = 4
if 'ID=5' in player_setting:
    usb_video_file = 'video5.mp4'
    sync_id = 5
if 'ID=6' in player_setting:
    usb_video_file = 'video6.mp4'
    sync_id = 6
if 'ID=7' in player_setting:
    usb_video_file = 'video7.mp4'
    sync_id = 7
if 'ID=8' in player_setting:
    usb_video_file = 'video8.mp4'
    sync_id = 8


class DisplayStatus():

    def __init__(self):

        self.sync_setting_file = '/boot/Sync_Setting.txt'

        self.id = sync_id

        self.id_to_set = sync_id

        self.video_name = usb_video_file
        # default Video Name is video1.mp4

        self.video_size = '0'

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

    def set_id(self):
        f = open(self.sync_setting_file, 'w')
        set_id_text = 'ID=' + str(self.id_to_set)
        f.write(set_id_text)
        f.close()
        os.system("sudo reboot")

