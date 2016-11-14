from gpiozero import LED, Button
from signal import pause
from subprocess import check_call
from time import sleep
import thread



class ButtonStatus():

    def __init__(self):
        self.btn_pressed = 0
        self.ready_to_reboot = 0
        self.ready_to_poweroff = 0
        self.reboot_count = 5

bs = ButtonStatus()

led = LED(17)

led.on()

def led_status(sleeptime, *args):

    if bs.btn_pressed == 0:
        led.on()

    if ready_to_reboot == 1:
        led.on()
        sleep(0.5)
        led.off()
        sleep(0.5)

    if bs.ready_to_poweroff == 1:
        led.on()
        sleep(0.25)
        led.off()
        sleep(0.25)


def poweroff():
    led.off()
    check_call(['sudo', 'poweroff'])


def reboot_process():
    print('reboot_process')

    if bs.btn_pressed == 1:
        bs.btn_pressed = 0
        print('set pressed = 0')

    elif bs.btn_pressed == 0:
        print('set pressed = 1 and ready to reboot = 1')
        bs.btn_pressed = 1
        bs.ready_to_reboot = 1

    while bs.btn_pressed == 1:

        if bs.ready_to_reboot == 1:
            print('reboot count -1 ==>')
            print(bs.reboot_count)
            bs.reboot_count -= 1
            bs.btn_pressed = 0

        if bs.reboot_count == 0:
            reboot()


def reboot():
    led.off()
    check_call(['sudo', 'reboot'])

reboot_btn = Button(27, hold_time=3)
reboot_btn.when_held = poweroff

reboot_btn.when_pressed = reboot_process

pause()