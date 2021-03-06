#!/usr/bin/python3
# -*- coding: utf-8 -*-
import pygame
import os
import platform
import time
from gpiozero import Button

import argparse

import _thread

# 引入python-osc
from pythonosc import dispatcher
from pythonosc import osc_server

try:
    import get_ip
except:
    print ('no get_ip')

try:
    my_ip = get_ip.myip
except:
    my_ip = 'unknown'

import display_status

button1 = None
while not button1:
    try:
        button1 = Button(23)
    except RuntimeError:
        pass

button2 = None
while not button2:
    try:
        button2 = Button(22)
    except RuntimeError:
        pass
button3 = None
while not button3:
    try:
        button3 = Button(24)
    except RuntimeError:
        pass
button4 = None
while not button4:
    try:
        button4 = Button(5)
    except RuntimeError:
        pass
button5 = None
while not button5:
    try:
        button5 = Button(17)
    except RuntimeError:
        pass
button6 = None
while not button6:
    try:
        button6 = Button(4)
    except RuntimeError:
        pass

ds = display_status.DisplayStatus()


def display_osc_master_message(unused_addr, args1, args2, args3, args4, args5, args6, args7, args8, args9, args10, args11, args12,
                args13, args14, args15):
    try:

        ds.device_status[1] = args1     # osc source
        ds.device_status[2] = args2     # to message
        ds.device_status[3] = args3     # played counts
        ds.device_status[4] = args4     # 1st device status
        ds.device_status[5] = args5     # 2rd device status
        ds.device_status[6] = args6     # 3th device status
        ds.device_status[7] = args7
        ds.device_status[8] = args8
        ds.device_status[9] = args9
        ds.device_status[10] = args10
        ds.device_status[11] = args11
        ds.device_status[12] = args12
        ds.device_status[13] = args13
        ds.device_status[14] = args14
        ds.device_status[15] = args15

        if ds.device_status[4] == 1:
            ds.last_play = time.time()

        # print('args={0} args2={1} args3={2} args4={3}'.format( ds.device_status[1], ds.device_status[2], ds.device_status[3], ds.device_status[4]))
        # print(args1)
        # print(args2)
        # print(args3)
        # print(args4)
    except:
        pass
        print("osc message error")


def display_osc_slave_message(unused_addr, args1, args2):
    try:
        print(unused_addr)
        print(args1)
        print(args2)
        if args1 == 10:
            ds.last_play = time.time()
            ds.count = args2
            print("setting osc value")
    except:
        pass
        print("osc message error")


hostname = platform.node()
os.environ['TZ'] = 'Asia/Taipei'
time.tzset()

font_file = "/home/pi/SyncPi-OSC/msjh.ttc"
os.putenv('SDL_FBDEV', '/dev/fb1')
pygame.init()
pygame.mouse.set_visible(False)
lcd = pygame.display.set_mode((320, 240))
lcd.fill((255, 0, 0))

pygame.display.update()

WHITE = (255, 255, 255)
STATUS = (127, 127, 255)
ALERT = (255, 255, 127)

font_xs = pygame.font.Font(font_file, 18)
font_small = pygame.font.Font(font_file, 24)
font_normal = pygame.font.Font(font_file, 36)
font_big = pygame.font.Font(font_file, 48)


def btnevent1():
    if ds.help_mode == 0:
        if ds.status == 0:
            ds.status = 1
        elif ds.status == 1:
            ds.status = 11
            ds.btnevent = 1


def btnevent2():
    if ds.help_mode == 0:
        if ds.status == 0:
            ds.status = 2
        elif ds.status == 1:
            ds.status = 11
            ds.btnevent = 2
        if ds.status == 3:
            ds.btnevent = 2


def btnevent3():
    if ds.help_mode == 0:
        if ds.status == 0:
            ds.status = 3
        elif ds.status == 1:
            ds.status = 11
            ds.btnevent = 3

        elif ds.status == 3:
            ds.btnevent = 3


def btnevent4():
    if ds.help_mode == 0:
        ds.help_mode = 1
    else:
        ds.help_mode = 0


def btnevent5():
    if ds.help_mode == 0:
        if ds.status == 11:
            ds.btnsubmit = 1
        if ds.status == 3:
            ds.btnsubmit = 1

def btnevent6():
    if ds.help_mode == 1:
        ds.help_mode = 0
    else:
        ds.status = 0
        ds.btnevent = 0


def tft_update(time_now):

    lcd.fill((0, 0, 0))

    if ds.help_mode == 1:
        if ds.status == 0 or ds.status == 1:
            display_help_mode(time_now)

        else:
            ds.help_mode = 0

    if ds.help_mode == 0:
        if ds.status == 0:
            display_main_info(time_now)
        elif ds.status == 1:
            display_set_player_mode(time_now)
        elif ds.status == 2:
            video_sync_mode(time_now)
        elif ds.status == 3:
            ip_set_mode(time_now)
        elif ds.status == 11:
            check_option(time)

    pygame.display.update()

    if ds.ready_reboot == 1:
        if ds.btnsubmit == 1:
            ds.btnsubmit = 0
            os.system('reboot')


def display_main_info(time_now):

    cpu_temp = ds.get_cpu_temperaure()
    player_mode = ds.get_player_mode()

    if ds.last_play == 0:
        playing_time = '未播放'
    else:
        playing_time = int(time.time() - ds.last_play)
        playing_time = str(playing_time // 60) + "分"+str(playing_time % 60) + "秒"

    if ds.id == 1:
        text_surface_device1 = font_small.render(u'1:%d' % ds.device_status[4], True, WHITE)
        text_surface_device2 = font_small.render(u'2:%d' % ds.device_status[5], True, WHITE)
        text_surface_device3 = font_small.render(u'3:%d' % ds.device_status[6], True, WHITE)
        text_surface_device4 = font_small.render(u'4:%d' % ds.device_status[7], True, WHITE)
        text_surface_device5 = font_small.render(u'5:%d' % ds.device_status[8], True, WHITE)
        text_surface_device6 = font_small.render(u'6:%d' % ds.device_status[9], True, WHITE)
        text_surface_device7 = font_small.render(u'7:%d' % ds.device_status[10], True, WHITE)
        text_surface_device8 = font_small.render(u'8:%d' % ds.device_status[11], True, WHITE)
        text_surface_device9 = font_small.render(u'9:%d' % ds.device_status[12], True, WHITE)
        text_surface_device10 = font_small.render(u'10:%d' % ds.device_status[13], True, WHITE)
        text_surface_device11 = font_small.render(u'11:%d' % ds.device_status[14], True, WHITE)
        text_surface_device12 = font_small.render(u'12:%d' % ds.device_status[15], True, WHITE)
        text_surface_play_count = font_small.render(u'影片已播:%d次 - %s' % (ds.device_status[3], playing_time), True, WHITE)
        rect_play_count = text_surface_play_count.get_rect(center=(160, 138))
        rect_device1 = text_surface_device1.get_rect(center=(45, 165))
        rect_device2 = text_surface_device2.get_rect(center=(93, 165))
        rect_device3 = text_surface_device3.get_rect(center=(141, 165))
        rect_device4 = text_surface_device4.get_rect(center=(189, 165))
        rect_device5 = text_surface_device5.get_rect(center=(237, 165))
        rect_device6 = text_surface_device6.get_rect(center=(285, 165))
        rect_device7 = text_surface_device7.get_rect(center=(45, 188))
        rect_device8 = text_surface_device8.get_rect(center=(93, 188))
        rect_device9 = text_surface_device9.get_rect(center=(141, 188))
        rect_device10 = text_surface_device10.get_rect(center=(189, 188))
        rect_device11 = text_surface_device11.get_rect(center=(237, 188))
        rect_device12 = text_surface_device12.get_rect(center=(285, 188))
        lcd.blit(text_surface_play_count, rect_play_count)

        lcd.blit(text_surface_device1, rect_device1)
        lcd.blit(text_surface_device2, rect_device2)
        lcd.blit(text_surface_device3, rect_device3)
        lcd.blit(text_surface_device4, rect_device4)
        lcd.blit(text_surface_device5, rect_device5)
        lcd.blit(text_surface_device6, rect_device6)
        lcd.blit(text_surface_device7, rect_device7)
        lcd.blit(text_surface_device8, rect_device8)
        lcd.blit(text_surface_device9, rect_device9)
        lcd.blit(text_surface_device10, rect_device10)
        lcd.blit(text_surface_device11, rect_device11)
        lcd.blit(text_surface_device12, rect_device12)
    else:
        text_surface_play_count = font_small.render(u'影片已播:%d次 - %s' % (ds.count, playing_time), True, WHITE)
        rect_play_count = text_surface_play_count.get_rect(center=(160, 138))
        lcd.blit(text_surface_play_count, rect_play_count)

    text_surface_hostname = font_small.render(u'%s' % hostname, True, WHITE)
    text_surface_cpu_temp = font_small.render(u'%s' % cpu_temp, True, WHITE)
    text_surface_myip = font_small.render(u'IP:%s' % my_ip, True, WHITE)
    text_surface_player_mode = font_small.render(u'模式:%s'% player_mode, True, WHITE)
    text_surface_video_now = font_small.render(u'現在影片：%s' % ds.video_name, True, WHITE)
    text_surface_time = font_small.render(u'%s' % time_now, True, WHITE)

    rect_hostname = text_surface_hostname.get_rect(center=(160, 18))
    rect_myip = text_surface_myip.get_rect(center=(160, 48))
    rect_player_mode = text_surface_player_mode.get_rect(center=(160,78))

    rect_video_now = text_surface_video_now.get_rect(center=(160,108))

    rect_time = text_surface_time.get_rect(center=(80, 216))
    rect_cpu_temp = text_surface_cpu_temp.get_rect(center=(240, 216))

    lcd.blit(text_surface_hostname, rect_hostname)
    lcd.blit(text_surface_myip, rect_myip)
    lcd.blit(text_surface_player_mode, rect_player_mode)
    lcd.blit(text_surface_cpu_temp, rect_cpu_temp)
    lcd.blit(text_surface_video_now, rect_video_now)
    lcd.blit(text_surface_time, rect_time)


def display_set_player_mode(time_now):

    title = u'播放模式設定'
    mode_now = u'現在模式：'
    if ds.player_mode == 0:
        mode_now += u'獨立播放模式'
    elif ds.player_mode == 1:
        mode_now += u'同步播放主機'
    elif ds.player_mode == 2:
        mode_now += u'同步播放從機'

    option0 = u'ο 獨立播放模式'
    option1 = u'□ 同步播放主機'
    option2 = u'△ 同步播放從機'
    btn4info = u'× 功能說明'

    btn6info = u'取消 ▽'

    text_surface_hostname = font_small.render(u'%s' % hostname, True, WHITE)
    text_surface_title = font_small.render(u'%s' % title, True, WHITE)
    text_surface_mode_now = font_small.render(u'%s' % mode_now, True, STATUS)

    text_surface_option0 = font_xs.render(u'%s' % option0, True, WHITE)
    text_surface_option1 = font_xs.render(u'%s' % option1, True, WHITE)
    text_surface_option2 = font_xs.render(u'%s' % option2, True, WHITE)
    text_surface_btn4info = font_xs.render(u'%s' % btn4info, True, WHITE)
    text_surface_btn6info = font_xs.render(u'%s' % btn6info, True, WHITE)

    rect_hostname = text_surface_hostname.get_rect(center=(160, 10))
    rect_title = text_surface_title.get_rect(center=(160, 35))
    rect_mode_now = text_surface_mode_now.get_rect(center=(160, 70))
    rect_option0 = text_surface_option0.get_rect(topleft=(20, 106))
    rect_option1 = text_surface_option1.get_rect(topleft=(20, 142))
    rect_option2 = text_surface_option2.get_rect(topleft=(20, 178))
    rect_btn4info = text_surface_btn4info.get_rect(topleft=(20, 216))
    rect_btn6info = text_surface_btn6info.get_rect(topright=(300, 216))

    lcd.blit(text_surface_hostname, rect_hostname)
    lcd.blit(text_surface_title, rect_title)
    lcd.blit(text_surface_mode_now, rect_mode_now)
    lcd.blit(text_surface_option0, rect_option0)
    lcd.blit(text_surface_option1, rect_option1)
    lcd.blit(text_surface_option2, rect_option2)
    lcd.blit(text_surface_btn4info, rect_btn4info)
    lcd.blit(text_surface_btn6info, rect_btn6info)


def check_option(time_now):

    if ds.status == 11:
        title = u'修改播放模式'
        mode_now = u'現在模式：'
        mode_modify = u''
        info = u'按 △ 確定修改 or 按 ▽ 取消'

        if ds.id != 1 and ds.id_to_set == 1:
            info = u'按下 △ 重新開機'
            print ('ds.submit %s ' % ds.btnsubmit)
            print ('ds.btnevent %s' % ds.btnevent)
            if ds.btnsubmit == 1:
                info = u'重新開機中'
                ds.set_id()

        if ds.player_mode == 0:
            mode_now += u'獨立播放模式'
            if ds.btnevent == 1:
                mode_modify = u'不做變動'
                if ds.btnsubmit == 1:
                    ds.btnsubmit = 0
                    ds.btnevent = 0
                    ds.status = 1
            elif ds.btnevent == 2:
                mode_modify = u'變更為同步播放主機'
                if ds.btnsubmit == 1:
                    ds.btnsubmit = 0
                    ds.player_mode = 1
                    ds.id_to_set = 1
                    ds.btnevent = 0
                    ds.status = 1

            elif ds.btnevent == 3:
                mode_modify = u'變更為同步播放從機'
                if ds.btnsubmit == 1:
                    ds.btnsubmit = 0
                    ds.player_mode = 2
                    ds.id_to_set = 2
                    ds.btnevent = 0
                    ds.status = 3

        elif ds.player_mode == 1:
            mode_now += u'同步播放主機'
            if ds.btnevent == 1:
                mode_modify = u'變更為獨立播放模式'
                if ds.btnsubmit == 1:
                    ds.btnsubmit = 0
                    ds.player_mode = 0
                    ds.btnevent = 0
                    ds.status = 11
            elif ds.btnevent == 2:
                mode_modify = u'不做變動'
                if ds.btnsubmit == 1:
                    ds.btnsubmit = 0
                    ds.btnevent = 0
                    ds.status = 1
            elif ds.btnevent == 3:
                mode_modify = u'變更為同步播放從機'
                if ds.btnsubmit == 1:
                    ds.btnsubmit = 0
                    ds.player_mode = 2
                    ds.id_to_set = 2
                    ds.btnevent = 0
                    ds.status = 3

        elif ds.player_mode == 2:
            mode_now += u'同步播放從機'

            if ds.btnevent == 1:
                mode_modify = u'變更為獨立播放模式'
                if ds.btnsubmit == 1:
                    ds.btnsubmit = 1
                    ds.player_mode = 0
                    ds.btnevent = 0
                    ds.status = 1
                    ds.id_to_set = 1
            elif ds.btnevent == 2:
                mode_modify = u'設定為同步播放主機'
                if ds.btnsubmit == 1:
                    ds.btnsubmit = 0
                    ds.player_mode = 1
                    ds.id_to_set = 1
                    ds.btnevent = 0
            elif ds.btnevent == 3:
                mode_modify = u'設定同步播放從機'
                if ds.btnsubmit == 1:
                    ds.btnsubmit = 0
                    ds.player_mode = 2
                    ds.id_to_set = 2
                    ds.btnevent = 0
                    ds.status = 3

        text_surface_hostname = font_small.render(u'%s' % hostname, True, WHITE)
        text_surface_title = font_small.render(u'%s' % title, True, WHITE)
        text_surface_mode_now = font_small.render(u'%s' % mode_now, True, STATUS)
        text_surface_mode_modify = font_small.render(u'%s' % mode_modify, True, ALERT)
        text_surface_info = font_small.render(u'%s' % info, True, WHITE)

        rect_hostname = text_surface_hostname.get_rect(center=(160, 10))
        rect_title = text_surface_title.get_rect(center=(160, 35))
        rect_mode_now = text_surface_mode_now.get_rect(center=(160, 70))
        rect_surface_mode_modify = text_surface_mode_modify.get_rect(center=(160, 110))
        rect_info = text_surface_info.get_rect(center=(160,160))

        lcd.blit(text_surface_hostname, rect_hostname)
        lcd.blit(text_surface_title, rect_title)
        lcd.blit(text_surface_mode_now, rect_mode_now)
        lcd.blit(text_surface_mode_modify, rect_surface_mode_modify)
        lcd.blit(text_surface_info, rect_info)


def video_sync_mode(time_now):

    title = u'影片同步功能'
    video_now = u'現在影片：'
    video_file_name = ds.video_name
    video_size = u'影片大小：' + str(ds.video_size)
    info = video_now + video_file_name

    text_surface_hostname = font_small.render(u'%s' % hostname, True, WHITE)
    text_surface_title = font_small.render(u'%s' % title, True, WHITE)
    text_surface_info = font_small.render(u'%s' % info, True, WHITE)
    text_surface_video_size = font_small.render(u'%s' % video_size, True, WHITE)

    rect_hostname = text_surface_hostname.get_rect(center=(160, 10))
    rect_title = text_surface_title.get_rect(center=(160, 35))
    rect_info = text_surface_info.get_rect(center=(160, 70))
    rect_video_size = text_surface_video_size.get_rect(center=(160,110))

    lcd.blit(text_surface_hostname, rect_hostname)
    lcd.blit(text_surface_title, rect_title)
    lcd.blit(text_surface_info, rect_info)
    lcd.blit(text_surface_video_size, rect_video_size)


def ip_set_mode(time_now):

    title = u'ID設定'
    id_now = ds.id
    ip_now = my_ip
    if ds.id_to_set == 12:
        info1 = u'ID最大值為12，不可再增加'
    else:
        info1 = u'□ 按鍵可增加指定新ID數值'

    if ds.id_to_set == 1:
        info2 = u'ID最小值為1，不可再減少'
    else:
        info2 = u'△ 按鍵可減少指定新ID數值'

    if ds.player_mode == 1:
        ds.id_to_set = '1'
        info1 = u'同步主機模式ID為固定值'
        info2 = u'同一網路不可有兩台同步主機'
    else:
        if ds.btnevent == 2:
            if ds.id_to_set < 12:
                ds.id_to_set += 1
                ds.btnsubmit = 0
                ds.btnevent = 0
                ds.ready_reboot = 0

        elif ds.btnevent == 3:
            if ds.id_to_set > 1:
                ds.id_to_set -= 1
                ds.btnsubmit = 0
                ds.btnevent = 0
                ds.ready_reboot = 0

    if ds.ready_reboot == 0:
        if ds.btnsubmit == 1:
            if ds.id != ds.id_to_set:
                info1 = u'寫入新id並準備重開機'
                info2 = u'再按一次 確認 △ 重新開機 '
                ds.set_id()
                ds.btnsubmit = 0

    elif ds.ready_reboot == 1:
        info1 = u'寫入新id並準備重開機'
        info2 = u'再按一次 確認 △ 重新開機 '
        if ds.btnsubmit == 1:
            info1 = u'正在重開機'
            info2 = u''

    text_surface_title = font_small.render(u'%s' % title, True, WHITE)
    text_surface_ip_now = font_small.render(u'目前IP：%s' % ip_now, True, WHITE)
    text_surface_id_now = font_small.render(u'目前ID：%s' % id_now, True, STATUS)
    text_surface_id_to_set = font_small.render(u'指定新ID至：%s' % ds.id_to_set, True, ALERT)
    text_surface_info1 = font_small.render(u'%s' % info1, True, WHITE)
    text_surface_info2 = font_small.render(u'%s' % info2, True, WHITE)

    rect_title = text_surface_title.get_rect(center=(160, 10))
    rect_ip_now = text_surface_ip_now.get_rect(center=(160, 35))
    rect_id_now = text_surface_id_now.get_rect(center=(160, 60))
    rect_id_to_set = text_surface_id_to_set.get_rect(center=(160, 100))
    rect_info1 = text_surface_info1.get_rect(center=(160, 180))
    rect_info2 = text_surface_info2.get_rect(center=(160, 220))

    lcd.blit(text_surface_title, rect_title)
    lcd.blit(text_surface_ip_now, rect_ip_now)
    lcd.blit(text_surface_id_now, rect_id_now)
    lcd.blit(text_surface_id_to_set, rect_id_to_set)
    lcd.blit(text_surface_info1, rect_info1)
    lcd.blit(text_surface_info2, rect_info2)


def display_help_mode(time_now):

    if ds.status == 0:
        title = u'鍵盤功能設明 - 主視窗'
        btn1info = u'ο 播放模式'
        btn2info = u'□ 同步影片檔案'
        btn3info = u'△ 設定ID'
        btn4info = u'× 功能說明'
        btn5info = u'確定 △'
        btn6info = u'取消 ▽'

    elif ds.status == 1:
        title = u'功能設明 - 播放模式'
        btn1info = u'ο 獨立播放'
        btn2info = u'□ 同步模式 - 主機'
        btn3info = u'△ 同步模式 - 從機'
        btn4info = u'× 功能說明'
        btn5info = u'確定 △'
        btn6info = u'取消 ▽'

    text_surface_title = font_small.render(u'%s' % title, True, WHITE)
    text_surface_btn1info = font_xs.render(u'%s' % btn1info, True, WHITE)
    text_surface_btn2info = font_xs.render(u'%s' % btn2info, True, WHITE)
    text_surface_btn3info = font_xs.render(u'%s' % btn3info, True, WHITE)
    text_surface_btn4info = font_xs.render(u'%s' % btn4info, True, WHITE)
    text_surface_btn5info = font_xs.render(u'%s' % btn5info, True, WHITE)
    text_surface_btn6info = font_xs.render(u'%s' % btn6info, True, WHITE)

    rect_title = text_surface_title.get_rect(center=(160, 30))
    rect_btn1info = text_surface_btn1info.get_rect(topleft=(20, 54))
    rect_btn2info = text_surface_btn2info.get_rect(topleft=(20, 108))
    rect_btn3info = text_surface_btn3info.get_rect(topleft=(20, 162))
    rect_btn4info = text_surface_btn4info.get_rect(topleft=(20, 216))
    rect_btn5info = text_surface_btn5info.get_rect(topright=(300, 54))
    rect_btn6info = text_surface_btn6info.get_rect(topright=(300, 216))

    lcd.blit(text_surface_title, rect_title)
    lcd.blit(text_surface_btn1info, rect_btn1info)
    lcd.blit(text_surface_btn2info, rect_btn2info)
    lcd.blit(text_surface_btn3info, rect_btn3info)
    lcd.blit(text_surface_btn4info, rect_btn4info)
    lcd.blit(text_surface_btn5info, rect_btn5info)
    lcd.blit(text_surface_btn6info, rect_btn6info)


def main(threadName, delay):

    button1.when_pressed = btnevent1
    button2.when_pressed = btnevent2
    button3.when_pressed = btnevent3
    button4.when_pressed = btnevent4
    button5.when_pressed = btnevent5
    button6.when_pressed = btnevent6

    while True:
        time.sleep(0.1)
        time_now = time.strftime('%X')
        tft_update(time_now)


if __name__ == '__main__':
    print ("Display info")

    parser = argparse.ArgumentParser()
    parser.add_argument("--ip",
                        default="127.0.0.1", help="The ip to listen on")
    parser.add_argument("--port",
                        type=int, default=9997, help="The port to listen on")
    args = parser.parse_args()

    # 設定python-osc接收頻道和呼叫函式

    dispatcher = dispatcher.Dispatcher()
    if ds.id == 1:
        dispatcher.map("/omxplayer", display_osc_master_message)
        print("master's server")
    else:
        dispatcher.map("/omxplayer", display_osc_slave_message)
        print("slave's server")

    server = osc_server.ThreadingOSCUDPServer(
        (args.ip, args.port), dispatcher)
    print("Serving on {}".format(server.server_address))

    # 用多線程執行main
    try:
        _thread.start_new_thread(main, ("main", 0))
    except:
        print("something wrong")

    # 持續osc接收
    server.serve_forever()