from gpiozero import LED, Button
from signal import pause

import argparse

from pythonosc import osc_message_builder
from pythonosc import udp_client

from subprocess import check_call
from time import sleep
import _thread

parser = argparse.ArgumentParser()
parser.add_argument("--ip", default="127.0.0.1", help="The ip of the OSC server")
parser.add_argument("--port", type=int, default=8999, help="The port of the OSC server listening on")
args = parser.parse_args()

client = udp_client.UDPClient(args.ip, args.port)

class ButtonStatus():

    def __init__(self):
        self.btn_pressed = 0
        self.ready_to_reboot = 0
        self.ready_to_poweroff = 0
        self.reboot_count = 10
        self.power_off_count = 0
        self.rebooting = 0
        self.power_off = 0

bs = ButtonStatus()

led = LED(17)

led.on()

def led_status(sleeptime, *args):

    while True:

        if bs.btn_pressed == 0:
            led.on()

        if bs.btn_pressed == 1:
            led.on()
            sleep(0.5)
            led.off()
            sleep(0.5)

        if bs.ready_to_poweroff == 1:
            led.on()
            sleep(0.25)
            led.off()
            sleep(0.25)

_thread.start_new_thread(led_status, (1, ""))


def poweroff():
    led.off()
    print('power off')

    omx1 = udp_client.UDPClient("192.168.1.201", 9998)
    omx2 = udp_client.UDPClient("192.168.1.202", 9998)
    omx3 = udp_client.UDPClient("192.168.1.203", 9998)
    omx4 = udp_client.UDPClient("192.168.1.204", 9998)
    omx5 = udp_client.UDPClient("192.168.1.205", 9998)
    omx6 = udp_client.UDPClient("192.168.1.206", 9998)
    omx7 = udp_client.UDPClient("192.168.1.207", 9998)
    omx8 = udp_client.UDPClient("192.168.1.208", 9998)
    omx9 = udp_client.UDPClient("192.168.1.209", 9998)
    omx10 = udp_client.UDPClient("192.168.1.210", 9998)
    omx11 = udp_client.UDPClient("192.168.1.211", 9998)
    omx12 = udp_client.UDPClient("192.168.1.212", 9998)

    msg = osc_message_builder.OscMessageBuilder(address="/omxplayer")
    msg.add_arg(1)
    msg.add_arg(4)
    msg = msg.build()
    omx1.send(msg)
    omx2.send(msg)
    omx3.send(msg)
    omx4.send(msg)
    omx5.send(msg)
    omx6.send(msg)
    omx7.send(msg)
    omx8.send(msg)
    omx9.send(msg)
    omx10.send(msg)
    omx11.send(msg)
    omx12.send(msg)

    # check_call(['sudo', 'poweroff'])


def reboot_process(sleeptime, *args):
    print('reboot_process')

    if bs.btn_pressed == 1:
        bs.power_off_count += 1
        bs.reboot_count = 10
        if bs.power_off_count >=2 and bs.rebooting == 0:
            bs.power_off_count = 1
            poweroff()
            print('power offffff')

    elif bs.btn_pressed == 0:
        print('set pressed = 1 and ready to reboot = 1')
        bs.btn_pressed = 1

    while bs.btn_pressed == 1:

        print('reboot count -1 ==>')
        print(bs.reboot_count)
        bs.reboot_count -= 1

        if bs.reboot_count <= 0 and bs.power_off == 0:
            led.off()
            bs.rebooting = 1
            print('rebootttt')
            reboot()
        sleep(1)


def reboot():
    led.off()

    omx1 = udp_client.UDPClient("192.168.1.201", 9998)
    omx2 = udp_client.UDPClient("192.168.1.202", 9998)
    omx3 = udp_client.UDPClient("192.168.1.203", 9998)
    omx4 = udp_client.UDPClient("192.168.1.204", 9998)
    omx5 = udp_client.UDPClient("192.168.1.205", 9998)
    omx6 = udp_client.UDPClient("192.168.1.206", 9998)
    omx7 = udp_client.UDPClient("192.168.1.207", 9998)
    omx8 = udp_client.UDPClient("192.168.1.208", 9998)
    omx9 = udp_client.UDPClient("192.168.1.209", 9998)
    omx10 = udp_client.UDPClient("192.168.1.210", 9998)
    omx11 = udp_client.UDPClient("192.168.1.211", 9998)
    omx12 = udp_client.UDPClient("192.168.1.212", 9998)

    msg2 = osc_message_builder.OscMessageBuilder(address="/omxplayer")
    msg2.add_arg(1)
    msg2.add_arg(3)
    msg2 = msg2.build()
    omx1.send(msg2)
    omx2.send(msg2)
    omx3.send(msg2)
    omx4.send(msg2)
    omx5.send(msg2)
    omx6.send(msg2)
    omx7.send(msg2)
    omx8.send(msg2)
    omx9.send(msg2)
    omx10.send(msg2)
    omx11.send(msg2)
    omx12.send(msg2)
    check_call(['sudo', 'reboot'])


def btn_pressed():
    _thread.start_new_thread(reboot_process, (1, ""))

reboot_btn = Button(27, hold_time=3)
reboot_btn.when_held = poweroff

reboot_btn.when_pressed = btn_pressed

pause()