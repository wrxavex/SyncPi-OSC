
class IDSetter:
    def __init__(self):
        id_setting_file = open('/boot/set_id', 'r')
        ip_config_file = open('/home/pi/SyncPi-OSC/config/ip_conf_sample', 'r')
        self.locked = 0
        self.id_to_set = id_setting_file.read().strip()
        self.ip_config = ip_config_file.read()
        self.my_movie = "/home/pi/ntmofa/"+self.id_to_set+".mp4"

    def set_to_new_ip(self):
        id_int = int(self.id_to_set)
        if 1 <= id_int <= 31:
            if id_int < 10:
                id_int = '0'+str(id_int)
            new_ip_config = self.ip_config.replace('replace_id_here', '2'+str(id_int))
            ip_set_file = open('/etc/dhcpcd.conf', 'w')
            ip_set_file.write(new_ip_config)
            ip_set_file.close()
        else:
            print('The ID not a valid number')

        print('ID Set Done')

if __name__ == '__main__':
    my_id = IDSetter()
    my_id.set_to_new=_ip()