import kivy.garden.mapview as m # https://pypi.org/project/kivy-garden.mapview/

from kivy.app import App
from kivy.uix.button import Button


class MapViewApp(App):
    def build(self):
        m1 = (43.3, 5.4)
        mx = (43.39, 5.39)
        mapview = m.MapView(zoom=9, lon=m1[1], lat=m1[0])

        m1 = m.MapMarkerPopup(lon=m1[1], lat=m1[0], source="marseille.jpg")  # marseille
        m1.add_widget(Button(text="You click on marseille"))

        m2 = m.MapMarkerPopup(lon=mx[1], lat=mx[0])  # autre

        m2.add_widget(Button(text="You click on other"))
        mapview.add_widget(m1)
        mapview.add_widget(m2)
        return mapview

MapViewApp().run()



