import plyer

#print(plyer.uniqueid.id)  # Identifiant unique d'un matériel


#print(plyer.gps)  # Coordonnées GPS

from kivy.app import App
from kivy.uix.label import Label

"""
def print_locations(**kwargs):
    print('lat: {lat}, lon: {lon}'.format(**kwargs))

class MainApp(App):
    def build(self):

        plyer.gps.configure(on_location=print_locations)
        plyer.gps.start()
        label = Label(text=str(plyer.uniqueid.id) + " " + str(plyer.gps.on_location),
                      size_hint=(.5, .5),
                      pos_hint={'center_x': .5, 'center_y': .5})
        # plus tard
        plyer.gps.stop()

        return label
"""

from android.permissions import request_permissions, Permission

class MainApp(App):
    def build(self):
        request_permissions(['android.permisssion.LOCATION_HARDWARE',
                             'android.permisssion.ACCESS_FINE_LOCATION',
                             'android.permisssion.READ_PHONE_STATE'])
        label = Label(text="hello world ! "+ str(plyer.uniqueid.id),
                      size_hint=(.5, .5),
                      pos_hint={'center_x': .5, 'center_y': .5})


        return label


if __name__ == '__main__':
    app = MainApp()
    app.run()


