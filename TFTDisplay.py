#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pygame
import os
import platform
import time
from gpiozero import Button

try:
    import get_ip
except:
    print ('no get_ip')

try:
    my_ip = get_ip.myip
except:
    my_ip = 'unknown'

import display_status

button1 = Button(23)
button2 = Button(22)
button3 = Button(24)
button4 = Button(5)
button5 = Button(17)
button6 = Button(4)

ds = display_status.DisplayStatus()

hostname = platform.node()
os.environ['TZ'] = 'Asia/Taipei'
time.tzset()

font_file = "/home/pi/SyncPi8/msjh.ttc"
os.putenv('SDL_FBDEV', '/dev/fb1')
pygame.init()
pygame.mouse.set_visible(False)
lcd = pygame.display.set_mode((320, 240))
lcd.fill((255, 0, 0))

pygame.display.update()

WHITE = (255, 255, 255)

font_xs = pygame.font.Font(font_file, 18)
font_small = pygame.font.Font(font_file, 24)
font_normal = pygame.font.Font(font_file, 36)
font_big = pygame.font.Font(font_file, 48)


def btnevent1():
    if ds.status == 0:
        ds.status = 1
    else:
        ds.status = 0


def btnevent2():
    if ds.status == 0:
        ds.status = 2




def btnevent3():
    if ds.status == 0:
        ds.status = 3
        ds.player_mode = 2
    else:
        ds.status = 0


def btnevent4():
    if ds.status == 0:
        ds.status = 4
    else:
        ds.status = 0


def btnevent5():
    if ds.status == 0:
        ds.status = 5
    else:
        ds.status = 0


def btnevent6():
    if ds.status == 0:
        ds.status = 6
    else:
        ds.status = 0


def tft_update(time_now):

    lcd.fill((0, 0, 0))
    if ds.status == 0:
        display_main_info(time_now)
    elif ds.status == 4:
        display_help_mode(time_now)
    pygame.display.update()


def display_main_info(time_now):

    cpu_temp = ds.get_cpu_temperaure()
    player_mode = ds.get_player_mode()

    text_surface_hostname = font_small.render(u'%s' % hostname, True, WHITE)
    text_surface_cpu_temp = font_small.render(u'%s' % cpu_temp, True, WHITE)
    text_surface_myip = font_small.render(u'IP:%s' % my_ip, True, WHITE)
    text_surface_player_mode = font_small.render(u'S:%s'% player_mode, True, WHITE)
    text_surface_time = font_small.render(u'%s' % time_now, True, WHITE)

    rect_hostname = text_surface_hostname.get_rect(center=(80, 18))
    rect_myip = text_surface_myip.get_rect(center=(160, 48))
    rect_player_mode = text_surface_player_mode.get_rect(center=(160,160))
    rect_cpu_temp = text_surface_cpu_temp.get_rect(center = (240, 18))
    rect_time = text_surface_time.get_rect(center=(160, 216))

    lcd.blit(text_surface_hostname, rect_hostname)
    lcd.blit(text_surface_myip, rect_myip)
    lcd.blit(text_surface_player_mode, rect_player_mode)
    lcd.blit(text_surface_cpu_temp, rect_cpu_temp)
    lcd.blit(text_surface_time, rect_time)


def display_set_player_mode(time_now):

    text_surface_hostname = font_small.render(u'%s' % hostname, True, WHITE)
    text_surface_myip = font_small.render(u'IP:%s' % my_ip, True, WHITE)
    text_surface_status = font_small.render(u'S:%s'% ds.status, True, WHITE)
    text_surface_time = font_small.render(u'%s' % time_now, True, WHITE)

    rect_hostname = text_surface_hostname.get_rect(center=(160, 18))
    rect_myip = text_surface_myip.get_rect(center=(160, 48))
    rect_status = text_surface_status.get_rect(center=(160,160))
    rect_time = text_surface_time.get_rect(center=(160, 216))

    lcd.blit(text_surface_hostname, rect_hostname)
    lcd.blit(text_surface_myip, rect_myip)
    lcd.blit(text_surface_status, rect_status)
    lcd.blit(text_surface_time, rect_time)


def display_help_mode(time_now):

    btn1info = u'● Setting Player Mode'
    btn2info = u'■ Sync Video File'
    btn3info = u'▲ No Use'
    btn4info = u'✖ Help'
    btn5info = u'Accept △'
    btn6info = u'Cancel ▽'

    text_surface_btn1info = font_xs.render(u'%s' % btn1info, True, WHITE)
    text_surface_btn2info = font_xs.render(u'%s' % btn2info, True, WHITE)
    text_surface_btn3info = font_xs.render(u'%s' % btn3info, True, WHITE)
    text_surface_btn4info = font_xs.render(u'%s' % btn4info, True, WHITE)
    text_surface_btn5info = font_xs.render(u'%s' % btn5info, True, WHITE)
    text_surface_btn6info = font_xs.render(u'%s' % btn6info, True, WHITE)

    rect_btn1info = text_surface_btn1info.get_rect(topleft=(20, 10))
    rect_btn2info = text_surface_btn2info.get_rect(topleft=(20, 75))
    rect_btn3info = text_surface_btn3info.get_rect(topleft=(20, 140))
    rect_btn4info = text_surface_btn4info.get_rect(topleft=(20, 205))
    rect_btn5info = text_surface_btn5info.get_rect(topright=(300, 10))
    rect_btn6info = text_surface_btn6info.get_rect(topright=(300, 205))

    lcd.blit(text_surface_btn1info, rect_btn1info)
    lcd.blit(text_surface_btn2info, rect_btn2info)
    lcd.blit(text_surface_btn3info, rect_btn3info)
    lcd.blit(text_surface_btn4info, rect_btn4info)
    lcd.blit(text_surface_btn5info, rect_btn5info)
    lcd.blit(text_surface_btn6info, rect_btn6info)


def main():

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
    main()

